import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { ApiError, StatusFilter } from "@/app/interfaces";
import {
  cleanParams,
  generateAppId,
  mapZodErrors,
  toNumber,
} from "@/app/utils/helper";
import { toastUtil } from "@/app/utils/toast";
import {
  CreateSubsidiaryPayload,
  SubsidiariesQuery,
  Subsidiary,
  SubsidiaryErrors,
  UpdateSubsidiaryPayload,
} from "@/app/interfaces/subsidiary";
import {
  createSubsidiary,
  deleteSubsidiary,
  getSubsidiaries,
  updateSubsidiary,
  updateSubsidiaryStatus,
} from "@/app/api/subsidiaries";
import {
  createSubsidiarySchema,
  updateSubsidiarySchema,
} from "@/app/schemas/subsidiary.schema";
import { getLightRoles } from "@/app/api/roles";

const defaultFormData = {
  id: "",
  name: "",
  code: "",
  country: "",
  address: "",
  email: "",
  isActive: true,
  dT_Created: "",
  dT_Modified: "",
};

function useSubsidiaryListViewModel() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterCountry, setFilterCountry] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmUpdateStatusOpen, setConfirmUpdateStatusOpen] = useState<boolean>(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const [confirmEditOpen, setConfirmEditOpen] = useState<boolean>(false);
  const [selectedSubsidiary, setSelectedSubsidiary] =
    useState<Subsidiary | null>(null);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [form, setForm] = useState(defaultFormData);
  const [fieldErrors, setFieldErrors] = useState<SubsidiaryErrors>({});

  const [pageNumber, setPageNumber] = useState(() =>
    toNumber(searchParams.get("pageNumber"), 1),
  );
  const [pageSize, setPageSize] = useState(() =>
    toNumber(searchParams.get("pageSize"), 10),
  );

  const [filters, setFilters] = useState({
    name: searchParams.get("name") ?? "",
    email: searchParams.get("email") ?? "",
  });

  const debouncedFilters = useDebouncedValue(filters, 400);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedFilters.email, debouncedFilters.name]);

  const queryParams: SubsidiariesQuery = useMemo(() => {
    const raw: SubsidiariesQuery = {
      pageNumber,
      pageSize,
      name: debouncedFilters.name,
      email: debouncedFilters.email,
      country: filterCountry === "all" ? "" : filterCountry,
      status: filterStatus,
    };

    // clean out empty strings
    return cleanParams(raw) as SubsidiariesQuery;
  }, [pageNumber, pageSize, debouncedFilters, filterStatus, filterCountry]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "subsidiaries",
      queryParams.pageNumber,
      queryParams.pageSize,
      queryParams.country,
      queryParams.email,
      queryParams.name,
      queryParams.status,
    ],
    queryFn: () => getSubsidiaries(queryParams),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (error) {
      const message =
        (error as ApiError)?.message ??
        (error instanceof Error
          ? error.message
          : "An error occurred while fetching subsidaries. Please try again.");
      toastUtil.error(message);
    }
  }, [error]);

  useEffect(() => {
    if (!selectedSubsidiary) return;

    setForm({
      ...defaultFormData,
      ...selectedSubsidiary,
      id: String(selectedSubsidiary.id),
      dT_Modified: selectedSubsidiary.dT_Modified ?? "",
    });
  }, [selectedSubsidiary]);

  const createMutation = useMutation({
    mutationFn: (payload: CreateSubsidiaryPayload) => createSubsidiary(payload),
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["subsidiaries"] });
      setConfirmEditOpen(false);
      setForm(defaultFormData);
      toastUtil.success("Subsidiary created successfully");
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while creating a subsidiary. Please try again.");
      toastUtil.error(message);
    },
    onSettled: () => setIsUpdating(false),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateSubsidiaryPayload) => {
      if (
        !selectedSubsidiary ||
        !("id" in selectedSubsidiary) ||
        typeof selectedSubsidiary.id !== "number"
      ) {
        throw new Error("Cannot update: missing subsidiary id");
      }
      return updateSubsidiary(selectedSubsidiary.id, payload);
    },
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["subsidiaries"] });
      setConfirmEditOpen(false);
      setSelectedSubsidiary(null);
      toastUtil.success("Subsidiary updated successfully");
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while updating the subsidary. Please try again.");
      toastUtil.error(message);
    },
    onSettled: () => setIsUpdating(false),
  });

  const deleteMutation = useMutation({
    mutationFn: (payload: Subsidiary) => {
      if (
        !payload ||
        !("id" in payload) ||
        typeof payload.id !== "number"
      ) {
        throw new Error("Cannot delete: missing subsidiary id");
      }
      return deleteSubsidiary(payload.id);
    },
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["subsidiaries"] });
      setConfirmDeleteOpen(false);
      setSelectedSubsidiary(null);
      toastUtil.success("Subsidiary deleted successfully");
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while deleting the subsidary. Please try again.");
      toastUtil.error(message);
    },
    onSettled: () => setIsUpdating(false),
  });

  const updateStatusMutation = useMutation({
    mutationFn: (status: "Active" | "Inactive") => {
      if (
        !selectedSubsidiary ||
        !("id" in selectedSubsidiary) ||
        typeof selectedSubsidiary.id !== "number"
      ) {
        throw new Error("Cannot update: missing subsidiary id");
      }
      return updateSubsidiaryStatus(selectedSubsidiary.id, status);
    },
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["subsidiaries"] });
      setConfirmUpdateStatusOpen(false);
      setSelectedSubsidiary(null);
      toastUtil.success(`Subsidiary status updated to ${data?.status} successfully`);
    },
    onError: (err) => {
      const message =
        (err as ApiError)?.message ??
        (err instanceof Error
          ? err.message
          : "An error occurred while updating the subsidary status. Please try again.");
      toastUtil.error(message);
    },
    onSettled: () => setIsUpdating(false),
  });

  const onChangePage = (next: number) => setPageNumber(next);

  const onChangePageSize = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
  };

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setIsFilter(true);
  };

  const handleUpdateStatus = (status: "Active" | "Inactive") => {
    if (!selectedSubsidiary) return;

    setIsUpdating(true);

    updateStatusMutation.mutate(status);
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" && { code: generateAppId(value) }),
    }));
  };

  const handleCloseModal = () => {
    setFieldErrors({});
    setSelectedSubsidiary(null);
    setForm(defaultFormData);
    setConfirmEditOpen(false);
    setConfirmOpen(false);
    setConfirmDeleteOpen(false);
    setConfirmUpdateStatusOpen(false);
  };

  const handleCreateSubsidiary = () => {
    const result = createSubsidiarySchema.safeParse(form);

    if (!result.success) {
      setFieldErrors(mapZodErrors<CreateSubsidiaryPayload>(result.error));
      return;
    }

    setFieldErrors({});

    const payload: CreateSubsidiaryPayload = {
      ...result.data,
      status: "Active",
    };

    createMutation.mutate(payload);
  };

  const handleUpdateSubsidiary = () => {
    if (!selectedSubsidiary) return;

    const formWithId = { ...form, id: Number(form.id) };

    const result = updateSubsidiarySchema.safeParse(formWithId);

    if (!result.success) {
      setFieldErrors(mapZodErrors<UpdateSubsidiaryPayload>(result.error));
      return;
    }

    const payload = {
      ...result.data,
      status: selectedSubsidiary.status
    }

    setFieldErrors({});
    updateMutation.mutate(payload);
  };

  const handleDeleteSubsidiary = () => {
    if (!selectedSubsidiary) return;

    deleteMutation.mutate(selectedSubsidiary);
  }

  const subsidaries: Subsidiary[] = data?.data ?? [];
  const totalCount: number = data?.totalCount ?? 0;
  const totalPages: number = data?.totalPages ?? 0;

  return {
    subsidaries,
    isLoading,
    error,
    filterStatus,
    isFilter,
    selectedSubsidiary,
    totalCount,
    totalPages,
    pageNumber,
    pageSize,
    isUpdating,
    confirmOpen,
    confirmDeleteOpen,
    confirmEditOpen,
    confirmUpdateStatusOpen,
    filters,
    queryClient,
    form,
    fieldErrors,
    filterCountry,
    onChange,
    setIsFilter,
    setFilterStatus,
    setFilterCountry,
    handleUpdateStatus,
    setSelectedSubsidiary,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setConfirmOpen,
    setConfirmDeleteOpen,
    setConfirmEditOpen,
    setConfirmUpdateStatusOpen,
    setFieldErrors,
    setForm,
    handleCloseModal,
    setFilters,
    handleCreateSubsidiary,
    handleUpdateSubsidiary,
    handleDeleteSubsidiary,
  };
}

export default useSubsidiaryListViewModel;

export type SubsidiaryListViewModel = ReturnType<
  typeof useSubsidiaryListViewModel
>;
