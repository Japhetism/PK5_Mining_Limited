import { useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ApplicationForm } from "@/components/ApplicationForm";
import { getJobById } from "@/data/jobs";

export function JobDetails() {
  const { jobId } = useParams<{ jobId: string }>();
  const formRef = useRef<HTMLDivElement>(null);

  const job = jobId ? getJobById(jobId) : undefined;

  if (!job) {
    return <Navigate to="/careers" replace />;
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sub-header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link 
            to="/careers" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Careers</span>
          </Link>
          <Button onClick={scrollToForm}>
            Apply Now
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Job Header */}
          <div className="mb-10">
            <Badge variant="secondary" className="mb-4">
              {job.department}
            </Badge>
            <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />
                <span>{job.department}</span>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-foreground">About the Role</h2>
            <p className="text-muted-foreground leading-relaxed">
              {job.description}
            </p>
          </section>

          <Separator className="my-8" />

          {/* Responsibilities */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Responsibilities</h2>
            <ul className="space-y-3">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <Separator className="my-8" />

          {/* Requirements */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Requirements</h2>
            <ul className="space-y-3">
              {job.requirements.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <Separator className="my-8" />

          {/* Benefits */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Benefits</h2>
            <ul className="space-y-3">
              {job.benefits.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Application Form */}
          <ApplicationForm ref={formRef} jobTitle={job.title} />
        </div>
      </main>
    </div>
  );
};