import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createJob, getJobById, updateJob } from "@/app/api/jobs";
import {
  CreateJobPayload,
  JobDto,
  JobErrors,
  UpdateJobPayload,
} from "@/app/interfaces";
import { validateJob } from "@/app/utils/validator";
import { getAxiosErrorMessage } from "@/app/utils/axios-error";

function useJobEditViewModel() {
  const { jobId } = useParams<{ jobId: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data,
    isLoading: jobLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => getJobById(jobId as string),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (fetchError) {
      const message = getAxiosErrorMessage(
        fetchError,
        "An error occurred while fetching job details. Please try again.",
      );
      toast.error(message);
    }
  }, [fetchError]);

  const existing = useMemo<JobDto | CreateJobPayload | undefined>(
    () => (jobId ? data : undefined),
    [jobId, data],
  );

  const createMutation = useMutation({
    mutationFn: (payload: CreateJobPayload) => createJob(payload),
    onSuccess: (data) => {
      setLoading(false);
      toast.success("Job created successfully");
      navigate(`/admin/jobs/${data?.id}`);
    },
    onError: (err: unknown) => {
      setLoading(false);
      const message = getAxiosErrorMessage(
        err,
        "An error occurred while saving the job. Please try again.",
      );

      toast.error(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateJobPayload) => {
      if (!existing || !("id" in existing)) {
        toast.error("Cannot update: missing existing job id");
        throw new Error("Cannot update: missing existing job id");
      }
      return updateJob(existing.id, payload);
    },
    onSuccess: (data) => {
      setLoading(false);
      queryClient.setQueryData(["jobs", String(data?.id)], data);
      toast.success("Job updated successfully");
      navigate(`/admin/jobs/${data?.id}`);
    },
    onError: (err: unknown) => {
      setLoading(false);
      const message = getAxiosErrorMessage(
        err,
        "An error occurred while updating the job. Please try again.",
      );

      toast.error(message);
    },
  });

  const mutation = existing ? updateMutation : createMutation;

  const [form, setForm] = useState({
    title: existing?.title ?? "",
    department: existing?.department ?? "",
    location: existing?.location ?? "",
    experience: existing?.experience ?? "",
    jobType: existing?.jobType ?? undefined,
    workArrangement: existing?.workArrangement ?? undefined,
    briefDescription: existing?.briefDescription ?? "",
    description: existing?.description ?? "",
    dT_Expiry: existing?.dT_Expiry ?? "",
  });
  const [fieldErrors, setFieldErrors] = useState<JobErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: JobErrors = validateJob(form);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    mutation.mutate({
      ...form,
      dT_Expiry: form.dT_Expiry
        ? new Date(form.dT_Expiry).toISOString()
        : undefined,
      dT_Modified: form.title ? new Date().toISOString() : undefined,
      isActive: existing?.isActive ?? true,
    });
  };

  return {
    existing,
    form,
    fieldErrors,
    loading: loading || jobLoading,
    navigate,
    onSubmit,
    setFieldErrors,
    onChange,
    setForm,
  };
}

export default useJobEditViewModel;

export type JobEditViewModel = ReturnType<typeof useJobEditViewModel>;
