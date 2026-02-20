import { createJob, getJobById, updateJob } from "@/app/api/jobs";
import {
  ApiError,
  CreateJobPayload,
  JobDto,
  JobErrors,
  UpdateJobPayload,
} from "@/app/interfaces";
import { validateJob } from "@/app/utils/validator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function useJobEditViewModel() {
  const { jobId } = useParams<{ jobId: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error: fetchError,
  } = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => getJobById(jobId as string),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
  });

  const existing = useMemo<JobDto | CreateJobPayload | undefined>(
    () => (jobId ? data : undefined),
    [jobId, data],
  );

  const createMutation = useMutation({
    mutationFn: (payload: CreateJobPayload) => createJob(payload),
    onSuccess: (data) => {
      setLoading(false);
      navigate(`/admin/jobs/${data?.id}`);
    },
    onError: (err: unknown) => {
      console.error(err);
      setLoading(false);

      const message =
        (err as ApiError)?.message ??
        (err instanceof Error ? err.message : undefined) ??
        "An error occurred while saving the job. Please try again.";

      setError(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateJobPayload) => {
      if (!existing || !("id" in existing)) {
        throw new Error("Cannot update: missing existing job id");
      }
      return updateJob(existing.id, payload);
    },
    onSuccess: (data) => {
      setLoading(false);
      queryClient.setQueryData(["jobs", String(data?.id)], data);
      navigate(`/admin/jobs/${data?.id}`);
    },
    onError: (err: unknown) => {
      console.error(err);
      setLoading(false);

      const message =
        (err as ApiError)?.message ??
        (err instanceof Error ? err.message : undefined) ??
        "An error occurred while updating the job. Please try again.";

      setError(message);
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
  const [error, setError] = useState<string>("");
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
    setError("");

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
    error,
    loading,
    navigate,
    onSubmit,
    setFieldErrors,
    onChange,
    setForm,
  };
}

export default useJobEditViewModel;

export type JobEditViewModel = ReturnType<typeof useJobEditViewModel>;
