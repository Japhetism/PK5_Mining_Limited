import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { MapPin, Clock, Linkedin, LocateIcon, ArrowLeft } from "lucide-react";
import { AnimatedSection } from "@/app/components/animated-section";
import { ApplicationErrors, JobDto } from "../interfaces";
import AnimatedDots from "../components/ui/animated-dots";
import { Badge } from "../components/ui/badge";
import { capitalizeFirstLetter } from "../utils/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getJobById } from "../api/jobs";
import { applyToJob } from "../api/applications";
import { JobDetailsLoader } from "../components/ui/job-details-loader";
import {
  isValidEmail,
  isValidLinkedIn,
  isValidName,
  isValidPhone,
  validateApplication,
} from "../utils/validator";

const countries = [
  "Nigeria",
  "United States",
  "United Kingdom",
  "Canada",
  "South Africa",
  "Tanzania",
  "Ghana",
  "Kenya",
  "United Arab Emirates",
  "Other",
];

const defaultFormData = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  phone: "",
  linkedinUrl: "",
};

export function JobDetailsPage() {
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
    mutationFn: applyToJob,
    onSuccess: () => {
      console.log("Application submitted");
      setFormData(defaultFormData);
      setSubmitted(true);
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  const job: JobDto | undefined = data;

  const [formData, setFormData] = useState(defaultFormData);
  const [fieldErrors, setFieldErrors] = useState<ApplicationErrors>({});

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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

    const errors = validateApplication(formData, resumeFile);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    mutation.mutate({
      jobId: job.id,
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      email: formData?.email,
      phoneNumber: formData?.phone,
      country: formData?.country,
      resume: "",
      linkedIn: formData.linkedinUrl,
    });
  };

  if (isLoading) {
    return <JobDetailsLoader />;
  }

  return (
    <div className="pt-24">
      {/* Hero / Job Summary */}
      <section className="py-16 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <Link to="/careers#open-positions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mb-5 bg-transparent text-xs text-white font-bold rounded hover:bg-transparents transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Careers
            </motion.button>
          </Link>
          {isError && (
            <AnimatedSection>
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
                <div className="max-w-4xl mx-auto py-20 text-center">
                  <h2 className="text-2xl font-bold mb-3 text-gray-200">
                    Job Not Found
                  </h2>
                  <p className="text-gray-400 mb-6">
                    The job you are looking for may have been removed or no
                    longer exists.
                  </p>

                  <Link
                    to="/careers#open-positions"
                    className="px-5 py-2 bg-[#c89b3c] text-black font-semibold rounded"
                  >
                    Browse Open Roles
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          )}
          {!isError && job && (
            <AnimatedSection>
              <div className="max-w-3xl">
                <Badge variant="secondary" className="mb-4">
                  {job?.department}
                </Badge>
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    {job?.title}
                  </h1>
                </div>
                <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
                  <span className="flex items-center gap-2">
                    <MapPin size={18} className="text-[#c89b3c]" />{" "}
                    {job?.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={18} className="text-[#c89b3c]" />{" "}
                    {job?.jobType && capitalizeFirstLetter(job.jobType)}
                  </span>
                  <span className="flex items-center gap-1">
                    <LocateIcon size={18} className="text-[#c89b3c]" />{" "}
                    {job?.workArrangement &&
                      capitalizeFirstLetter(job.workArrangement)}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c89b3c]" />
                    {job?.experience} experience
                  </span>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Job Details & Application Form */}
      {!isError && job && (
        <section className="py-20 bg-[#0f0f0f]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Job Description (can be expanded later with responsibilities/requirements) */}
              <AnimatedSection>
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
                  <div
                    className="text-gray-300 leading-relaxed mb-6
                    [&_p]:mb-4
                    [&_ul]:mb-6 [&_ul]:pl-6 [&_ul]:list-disc
                    [&_li]:mb-2
                    [&_p>strong]:block
                    [&_p>strong]:text-xl
                    [&_p>strong]:font-semibold
                    [&_p>strong]:text-white
                    [&_p>strong]:mb-3
                    [&_p>strong]:mt-6"
                    dangerouslySetInnerHTML={{ __html: job?.description ?? "" }}
                  />
                </div>
              </AnimatedSection>

              {/* Application Form */}
              <AnimatedSection delay={0.1}>
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    Submit Your Application
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <motion.input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          onBlur={() => {
                            if (!isValidName(formData.firstName)) {
                              setFieldErrors((prev) => ({
                                ...prev,
                                firstName: "Invalid first name",
                              }));
                            } else {
                              setFieldErrors((prev) => {
                                const updated = { ...prev };
                                delete updated.firstName;
                                return updated;
                              });
                            }
                          }}
                          className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                          ${fieldErrors.firstName ? "border-red-500" : "border-gray-800"}
                          focus:border-[#c89b3c]`}
                        />
                        {fieldErrors.firstName && (
                          <p className="text-xs text-red-500 mt-1">
                            {fieldErrors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <motion.input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          onBlur={() => {
                            if (!isValidName(formData.lastName)) {
                              setFieldErrors((prev) => ({
                                ...prev,
                                lastName: "Invalid last name",
                              }));
                            } else {
                              setFieldErrors((prev) => {
                                const updated = { ...prev };
                                delete updated.lastName;
                                return updated;
                              });
                            }
                          }}
                          className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                            ${fieldErrors.lastName ? "border-red-500" : "border-gray-800"}
                            focus:border-[#c89b3c]`}
                        />
                        {fieldErrors.lastName && (
                          <p className="text-xs text-red-500 mt-1">
                            {fieldErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <motion.input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => {
                            if (!isValidEmail(formData.email)) {
                              setFieldErrors((prev) => ({
                                ...prev,
                                email: "Invalid email",
                              }));
                            } else {
                              setFieldErrors((prev) => {
                                const updated = { ...prev };
                                delete updated.email;
                                return updated;
                              });
                            }
                          }}
                          className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                          ${fieldErrors.email ? "border-red-500" : "border-gray-800"}
                          focus:border-[#c89b3c]`}
                        />
                        {fieldErrors.email && (
                          <p className="text-xs text-red-500 mt-1">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Country
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <motion.select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          onBlur={() => {
                            if (!formData.country) {
                              setFieldErrors((prev) => ({
                                ...prev,
                                country: "Country is required",
                              }));
                            } else {
                              setFieldErrors((prev) => {
                                const updated = { ...prev };
                                delete updated.country;
                                return updated;
                              });
                            }
                          }}
                          className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                            ${fieldErrors.country ? "border-red-500" : "border-gray-800"}
                            focus:border-[#c89b3c]`}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </motion.select>
                        {fieldErrors.country && (
                          <p className="text-xs text-red-500 mt-1">
                            {fieldErrors.country}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <motion.input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={() => {
                            if (!isValidPhone(formData.phone)) {
                              setFieldErrors((prev) => ({
                                ...prev,
                                phone: "Invalid phone number",
                              }));
                            } else {
                              setFieldErrors((prev) => {
                                const updated = { ...prev };
                                delete updated.phone;
                                return updated;
                              });
                            }
                          }}
                          className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                            ${fieldErrors.phone ? "border-red-500" : "border-gray-800"}
                            focus:border-[#c89b3c]`}
                        />
                        {fieldErrors.phone && (
                          <p className="text-xs text-red-500 mt-1">
                            {fieldErrors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <Linkedin className="w-4 h-4" />
                          LinkedIn Profile URL
                        </label>
                        <motion.input
                          type="url"
                          name="linkedinUrl"
                          placeholder="https://linkedin.com/in/your-profile"
                          value={formData.linkedinUrl}
                          onChange={handleChange}
                          onBlur={() => {
                            if (!isValidLinkedIn(formData.linkedinUrl)) {
                              setFieldErrors((prev) => ({
                                ...prev,
                                linkedinUrl: "Invalid LinkedIn URL",
                              }));
                            } else {
                              setFieldErrors((prev) => {
                                const updated = { ...prev };
                                delete updated.linkedinUrl;
                                return updated;
                              });
                            }
                          }}
                          className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                            ${fieldErrors.linkedinUrl ? "border-red-500" : "border-gray-800"}
                            focus:border-[#c89b3c]`}
                        />
                        {fieldErrors.linkedinUrl && (
                          <p className="text-xs text-red-500 mt-1">
                            {fieldErrors.linkedinUrl}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Resume (PDF, max 2MB)
                        <span className="ml-1 text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <motion.input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-[#c89b3c] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-[#d4a84a]"
                        />
                      </div>
                      {fieldErrors.resume && (
                        <p className="text-xs text-red-500 mt-1">
                          {fieldErrors.resume}
                        </p>
                      )}
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2">
                        {error}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      whileHover={!loading ? { scale: 1.02 } : undefined}
                      whileTap={!loading ? { scale: 0.98 } : undefined}
                      animate={loading ? { scale: [1, 1.01, 1] } : { scale: 1 }}
                      transition={
                        loading
                          ? { repeat: Infinity, duration: 1.2 }
                          : { duration: 0.2 }
                      }
                      className="w-full mt-2 px-8 py-4 bg-[#c89b3c] text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#d4a84a] transition-colors disabled:opacity-70"
                      disabled={loading || submitted}
                    >
                      {submitted ? (
                        <>Application Submitted</>
                      ) : loading ? (
                        <>
                          Submitting
                          <AnimatedDots />
                        </>
                      ) : (
                        <>Submit Application</>
                      )}
                    </motion.button>

                    {submitted && (
                      <p className="mt-3 text-sm text-green-500 bg-green-500/10 border border-green-500/40 rounded-md px-3 py-2">
                        Thank you for applying! Our team will review your
                        application and get back to you.
                      </p>
                    )}
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
