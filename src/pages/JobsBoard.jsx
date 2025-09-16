import React, { useState, useEffect } from "react";
import {
  getJobs,
  addJob,
  updateJob,
  archiveJob,
} from "../utils/jobsStorage";
import { addCandidate, getCandidates } from "../utils/candidatesStorage";

const jobTitles = [
  'Frontend Developer',
  'UI Designer',
  'Backend Developer',
  'Full Stack Developer',
  'Java Developer',
  'React Engineer',
  'Node.js Developer',
  'DevOps Engineer',
  'QA Tester',
  'Product Manager',
];

function JobsBoard() {
  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 7;
  // ...existing code...
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [tags, setTags] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [editJob, setEditJob] = useState(null);
  const [applyJob, setApplyJob] = useState(null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    setJobs(getJobs());
    setCandidates(getCandidates(getJobs()));
  }, []);

  // Filtering
  const filteredJobs = jobs.filter(job => {
    const matchesTitle = titleFilter ? job.title === titleFilter : job.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status ? job.status === status : true;
    const matchesTags = tags ? job.tags.some(tag => tag.toLowerCase().includes(tags.toLowerCase())) : true;
    return matchesTitle && matchesStatus && matchesTags;
  });
  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const pagedJobs = filteredJobs.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Jobs Board</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 transition"
          onClick={() => { setModalType("create"); setShowModal(true); }}
        >
          Create Job
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        <select className="border px-3 py-2 rounded-md" value={titleFilter} onChange={e => setTitleFilter(e.target.value)}>
          <option value="">All Titles</option>
          {jobTitles.map(title => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
        <input className="border px-3 py-2 rounded-md" placeholder="Search by title..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="border px-3 py-2 rounded-md" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
        <input className="border px-3 py-2 rounded-md" placeholder="Tags..." value={tags} onChange={e => setTags(e.target.value)} />
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-lg shadow divide-y">
        {pagedJobs.map((job) => (
          <div key={job.id} className="flex items-center justify-between px-6 py-4">
            <div>
              <a href={`/jobs/${job.id}`} className="text-lg font-semibold text-indigo-700 hover:underline">
                {job.title}
              </a>
              <span className={`ml-2 px-2 py-1 rounded text-xs ${job.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                {job.status}
              </span>
              {job.tags.map(tag => (
                <span key={tag} className="ml-2 px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs">{tag}</span>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:underline" onClick={() => { setEditJob(job); setModalType("edit"); setShowModal(true); }}>Edit</button>
              <button className="text-yellow-600 hover:underline" onClick={() => { archiveJob(job.id, !job.archived); setJobs(getJobs()); }}>{job.archived ? "Unarchive" : "Archive"}</button>
              <button className="text-green-600 hover:underline" onClick={() => setApplyJob(job)}>Apply</button>
            </div>
      {/* Modal for Apply to Job */}
      {applyJob && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Apply to {applyJob.title}</h2>
            <form
              className="space-y-4"
              onSubmit={e => {
                e.preventDefault();
                const form = e.target;
                const name = form.name.value.trim();
                const email = form.email.value.trim();
                if (!name || !email) return;
                addCandidate({ name, email, stage: "applied", jobId: applyJob.id, timeline: [{ stage: "applied", date: new Date().toISOString().slice(0,10) }], notes: [] }, getJobs());
                setCandidates(getCandidates(getJobs()));
                setApplyJob(null);
              }}
            >
              <input name="name" className="border px-3 py-2 rounded-md w-full" placeholder="Your Name" required />
              <input name="email" className="border px-3 py-2 rounded-md w-full" placeholder="Your Email" required />
              <div className="flex justify-end space-x-2">
                <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setApplyJob(null)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Apply</button>
              </div>
            </form>
          </div>
        </div>
      )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6 space-x-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >Prev</button>
        <span className="px-3 py-1">Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >Next</button>
      </div>

      {/* Modal for Create/Edit Job */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{modalType === "create" ? "Create Job" : "Edit Job"}</h2>
            <form
              className="space-y-4"
              onSubmit={e => {
                e.preventDefault();
                const form = e.target;
                const title = form.title.value.trim();
                const slug = form.slug.value.trim();
                const tagsArr = form.tags.value.split(",").map(t => t.trim()).filter(Boolean);
                const statusVal = form.status.value;
                if (!title || !slug) return;
                if (modalType === "create") {
                  addJob({ title, slug, tags: tagsArr, status: statusVal, archived: statusVal === "archived" });
                } else if (editJob) {
                  updateJob(editJob.id, { title, slug, tags: tagsArr, status: statusVal, archived: statusVal === "archived" });
                }
                setJobs(getJobs());
                setShowModal(false);
                setEditJob(null);
              }}
            >
              <input name="title" className="border px-3 py-2 rounded-md w-full" placeholder="Job Title (required)" defaultValue={editJob?.title || ""} required />
              <input name="slug" className="border px-3 py-2 rounded-md w-full" placeholder="Unique Slug (required)" defaultValue={editJob?.slug || ""} required />
              <input name="tags" className="border px-3 py-2 rounded-md w-full" placeholder="Tags (comma separated)" defaultValue={editJob?.tags?.join(", ") || ""} />
              <select name="status" className="border px-3 py-2 rounded-md w-full" defaultValue={editJob?.status || "active"}>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => { setShowModal(false); setEditJob(null); }}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{modalType === "create" ? "Create" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobsBoard;
