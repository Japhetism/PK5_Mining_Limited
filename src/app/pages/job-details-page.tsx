import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  Briefcase,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe2,
  Linkedin,
  LocateIcon,
  ArrowLeft,
} from "lucide-react";
import { AnimatedSection } from "@/app/components/animated-section";
import { jobs } from "../fixtures";
import { IJob } from "../interfaces";
import AnimatedDots from "../components/ui/animated-dots";
import { Badge } from "../components/ui/badge";

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

export function JobDetailsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const job: IJob | undefined = jobs.find((j) => j.id === jobId);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    linkedinUrl: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!job) {
    return <Navigate to="/careers" replace />;
  }

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

    const maxSizeBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeBytes) {
      setError("Resume file size must be 5MB or less.");
      setResumeFile(null);
      return;
    }

    setError("");
    setResumeFile(file);
  };

  const validateLinkedIn = (url: string) => {
    if (!url) return true;
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
      return parsed.hostname.includes("linkedin.com");
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    if (!resumeFile) {
      setError("Please upload your resume.");
      return;
    }

    if (!validateLinkedIn(formData.linkedinUrl)) {
      setError("Please provide a valid LinkedIn profile URL.");
      return;
    }

    const form = new FormData();
    form.append("jobId", job.id);
    form.append("jobTitle", job.title);
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("country", formData.country);
    form.append("phone", formData.phone);
    form.append("linkedinUrl", formData.linkedinUrl);
    form.append("resume", resumeFile);

    try {
      setLoading(true);

      const res = await fetch(
        "https://pk5-api.vercel.app/api/job-application",
        {
          method: "POST",
          body: form,
        },
      );

      if (!res.ok) {
        throw new Error("Failed to submit application. Please try again.");
      }

      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        phone: "",
        linkedinUrl: "",
      });
      setResumeFile(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      {/* Hero / Job Summary */}
      <section className="py-16 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <Link to="/careers">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mb-5 bg-transparent text-xs text-white font-bold rounded hover:bg-transparents transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Careers
            </motion.button>
          </Link>
          <AnimatedSection>
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                {job.department}
              </Badge>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold">{job.title}</h1>
              </div>
              <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
                <span className="flex items-center gap-2">
                  <MapPin size={18} className="text-[#c89b3c]" /> {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} className="text-[#c89b3c]" /> {job.jobType}
                </span>
                <span className="flex items-center gap-1">
                  <LocateIcon size={18} className="text-[#c89b3c]" />{" "}
                  {job.workArrangement}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c89b3c]" />
                  {job.experience} experience
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Job Details & Application Form */}
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
                  dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
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
                      </label>
                      <motion.input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-lg focus:border-[#c89b3c] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <motion.input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-lg focus:border-[#c89b3c] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <motion.input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-lg focus:border-[#c89b3c] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Country
                      </label>
                      <motion.select
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-lg focus:border-[#c89b3c] focus:outline-none transition-colors"
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </motion.select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <motion.input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-lg focus:border-[#c89b3c] focus:outline-none transition-colors"
                      />
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
                        required
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-lg focus:border-[#c89b3c] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Resume (PDF, DOC, DOCX, max 5MB)
                    </label>
                    <div className="flex items-center gap-3">
                      <motion.input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-[#c89b3c] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-[#d4a84a]"
                      />
                    </div>
                    {resumeFile && (
                      <p className="mt-2 text-xs text-gray-400">
                        Selected: {resumeFile.name}
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
    </div>
  );
}
