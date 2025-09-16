import { useState } from 'react';
import { Link } from 'react-router-dom';

const jobsList = [
  {
    id: 1,
    title: 'Senior React Developer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    tags: ['React', 'JavaScript', 'TypeScript']
  },
  {
    id: 2,
    title: 'UX Designer',
    location: 'New York',
    type: 'Full-time',
    department: 'Design',
    tags: ['Figma', 'UI/UX', 'User Research']
  },
  {
    id: 3,
    title: 'Product Manager',
    location: 'San Francisco',
    type: 'Full-time',
    department: 'Product',
    tags: ['Strategy', 'Agile', 'Leadership']
  }
];

function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredJobs = jobsList.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 7;
  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const pagedJobs = filteredJobs.slice((page - 1) * pageSize, page * pageSize);
  // Color map for tags
  const tagColors = {
    archived: "bg-gray-300 text-gray-700",
    active: "bg-green-100 text-green-800",
    docker: "bg-blue-100 text-blue-800",
    react: "bg-cyan-100 text-cyan-800",
    node: "bg-lime-100 text-lime-800",
    java: "bg-yellow-100 text-yellow-800",
    aws: "bg-orange-100 text-orange-800",
    figma: "bg-pink-100 text-pink-800",
    jest: "bg-purple-100 text-purple-800",
    sql: "bg-teal-100 text-teal-800",
    cloud: "bg-indigo-100 text-indigo-800",
    flutter: "bg-fuchsia-100 text-fuchsia-800",
    leadership: "bg-red-100 text-red-800",
    agile: "bg-amber-100 text-amber-800",
    ui: "bg-cyan-100 text-cyan-800",
    api: "bg-lime-100 text-lime-800",
    spring: "bg-yellow-100 text-yellow-800",
    database: "bg-teal-100 text-teal-800",
    design: "bg-pink-100 text-pink-800",
    testing: "bg-purple-100 text-purple-800",
    mobile: "bg-fuchsia-100 text-fuchsia-800",
    remote: "bg-gray-100 text-gray-800",
    // fallback
    default: "bg-indigo-100 text-indigo-800"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Open Positions</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Post New Job
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Jobs List */}
      <div className="grid gap-8">
        {pagedJobs.map(job => (
          <div key={job.id} className="bg-white rounded-lg shadow-lg p-8 min-h-[220px] w-full max-w-3xl mx-auto flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-2">
                  <p className="text-gray-500 text-sm">ID: <span className="font-semibold">{job.id}</span></p>
                  <p className="text-gray-500 text-sm">Slug: <span className="font-semibold">{job.slug}</span></p>
                  <p className="text-gray-600">Location: <span className="font-semibold">{job.location}</span></p>
                  <p className="text-gray-600">Type: <span className="font-semibold">{job.type}</span></p>
                  <p className="text-gray-600">Department: <span className="font-semibold">{job.department}</span></p>
                  <p className="text-green-700 font-semibold">Salary: {job.salary || "N/A"}</p>
                  <p className="text-gray-600">Status: <span className="font-semibold">{job.status}</span></p>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.tags.map(tag => {
                    const colorClass = tagColors[tag.toLowerCase()] || tagColors.default;
                    return (
                      <span
                        key={tag}
                        className={`px-2 py-1 ${colorClass} text-sm rounded-full`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                  {/* Status tag */}
                  <span className={`px-2 py-1 ${tagColors[job.status] || tagColors.default} text-sm rounded-full`}>
                    {job.status}
                  </span>
                </div>
              </div>
              <Link
                to={`/jobs/${job.id}`}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm h-fit"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >Prev</button>
        <span className="px-3 py-1">Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >Next</button>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >Prev</button>
        <span className="px-3 py-1">Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >Next</button>
      </div>
    </div>
  );
}

export default JobsPage;