import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { applyToJob } from "@/app/api/applications";
import { getJobById } from "@/app/api/jobs";
import { defaultFormData } from "@/app/constants";
import { ApplicationErrors, JobApplicationDto, JobDto } from "@/app/interfaces";
import { validateApplication } from "@/app/utils/validator";
import { ApplicationInput, applicationSchema } from "@/app/schemas/application.schema";
import { mapZodErrors } from "@/app/utils/helper";

function useJobDetailsViewModel() {
  const { jobId } = useParams<{ jobId: string }>();

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

  const mutation = useMutation({
    mutationFn: (fd: FormData) => applyToJob(fd),
    onSuccess: () => {
      setFormData(defaultFormData);
      setSubmitted(true);
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
    },
  });

  const job: JobDto | undefined = data;

  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [fieldErrors, setFieldErrors] = useState<ApplicationErrors>({});

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setResumeFile(null);
      return;
    }

    const maxSizeBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeBytes) {
      setError("Resume file size must be 2MB or less.");
      setResumeFile(null);
      return;
    }

    setError("");
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    if (!job?.id || !job?.title) {
      setError("Job details are missing. Please refresh and try again.");
      return;
    }

    const result = applicationSchema.safeParse({ ...formData, resumeFile, hasAgreedToTerms });

    if (!result.success) {
      setFieldErrors(mapZodErrors<ApplicationInput>(result.error));
      return;
    }

    setFieldErrors({});
    setLoading(true);

    if (resumeFile) {
      const fd = new FormData();
      fd.append("JobId", String(job.id));
      fd.append("FirstName", formData.firstName);
      fd.append("LastName", formData.lastName);
      fd.append("Email", formData.email);
      fd.append("PhoneNumber", formData.phone);
      fd.append("Country", formData.country);
      fd.append("LinkedIn", formData.linkedinUrl);
      fd.append("ResumeFile", resumeFile, resumeFile.name);
      fd.append("status", "new");

      mutation.mutate(fd);
    }
  };

  return {
    job,
    isLoading,
    isError,
    fetchError,
    formData,
    fieldErrors,
    loading,
    submitted,
    error,
    hasAgreedToTerms,
    handleChange,
    handleFileChange,
    handleSubmit,
    setFormData,
    setFieldErrors,
    setHasAgreedToTerms,
  };
}

export default useJobDetailsViewModel;

export type JobDetailsViewModel = ReturnType<typeof useJobDetailsViewModel>;
