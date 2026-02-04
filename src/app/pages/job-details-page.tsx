import { ArrowLeft, Building2, Clock, LocateIcon, MapPin } from "lucide-react";
import { useParams, Link, Navigate } from "react-router-dom";
import { jobs } from "../fixtures";
import { Badge } from "../components/ui/badge";

export function JobDetailsPage() {
  const job = jobs[0];
  return (
    <div className="pt-24">
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
                <span>{job.jobType}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LocateIcon className="h-4 w-4" />
                <span>{job.workArrangement}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
