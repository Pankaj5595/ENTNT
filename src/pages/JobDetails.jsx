import { useParams, Link } from "react-router-dom";
import { getJobs } from "../utils/jobsStorage";

function JobDetails() {
  const { jobId } = useParams();
  const jobs = getJobs();
  const job = jobs.find(j => String(j.id) === String(jobId));

  if (!job) return <div className="p-8">Job not found.</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <div className="mb-4">
        <span className="text-gray-700">Location:</span> <span className="font-semibold">{job.location}</span>
      </div>
      <div className="mb-4">
        <span className="text-gray-700">Salary:</span> <span className="font-semibold text-green-700">{job.salary}</span>
      </div>
      <div className="mb-4">
        <span className="text-gray-700">Department:</span> <span className="font-semibold">{job.department || "N/A"}</span>
      </div>
      <div className="mb-4">
        <span className="text-gray-700">Type:</span> <span className="font-semibold">{job.type || "N/A"}</span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {job.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">{tag}</span>
        ))}
        <span className={`px-2 py-1 ${job.status === "archived" ? "bg-gray-300 text-gray-700" : "bg-green-100 text-green-800"} text-sm rounded-full`}>
          {job.status}
        </span>
      </div>
      <Link to="/jobs" className="text-indigo-600 hover:underline">Back to Jobs</Link>
    </div>
  );
}

export default JobDetails;
