import React, { useState, useEffect } from "react";
import { getJobs } from "../utils/jobsStorage";
import { getCandidates, updateCandidate } from "../utils/candidatesStorage";

const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    const jobsData = getJobs();
    setJobs(jobsData);
    setCandidates(getCandidates(jobsData));
  }, []);

  // Filter candidates by search and stage
  const filteredCandidates = candidates.filter(
    c =>
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())) &&
      (stageFilter ? c.stage === stageFilter : true) &&
      (roleFilter ? jobs.find(j => j.id === c.jobId)?.title === roleFilter : true)
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Candidates</h1>

      {/* Search and filter */}
      <div className="flex space-x-4 mb-4">
        <input
          className="border px-3 py-2 rounded-md"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="border px-3 py-2 rounded-md" value={stageFilter} onChange={e => setStageFilter(e.target.value)}>
          <option value="">All Stages</option>
          {stages.map(stage => (
            <option key={stage} value={stage}>{stage.charAt(0).toUpperCase() + stage.slice(1)}</option>
          ))}
        </select>
        <select className="border px-3 py-2 rounded-md" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          {jobs.map(job => (
            <option key={job.id} value={job.title}>{job.title}</option>
          ))}
        </select>
      </div>

      {/* Virtualized List Placeholder */}
      <div className="bg-white rounded-lg shadow divide-y mb-8">
        {filteredCandidates.map(candidate => (
          <div key={candidate.id} className="flex items-center justify-between px-6 py-4">
            <div>
              <span className="font-semibold text-indigo-700 cursor-pointer hover:underline" onClick={() => setSelectedCandidate(candidate)}>
                {candidate.name}
              </span>
              <span className="ml-2 text-gray-500">{candidate.email}</span>
              <span className="ml-2 px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs">{candidate.stage.charAt(0).toUpperCase() + candidate.stage.slice(1)}</span>
              <span className="ml-2 px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">{jobs.find(j => j.id === candidate.jobId)?.title}</span>
            </div>
            <button className="text-blue-600 hover:underline">Move Stage</button>
          </div>
        ))}
      </div>

      {/* Kanban Board Placeholder */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Kanban Board (Drag & Drop)</h2>
        <div className="grid grid-cols-6 gap-4">
          {stages.map(stage => (
            <div key={stage} className="bg-gray-100 rounded-lg p-4 min-h-[100px]">
              <h3 className="font-semibold mb-2">{stage.charAt(0).toUpperCase() + stage.slice(1)}</h3>
              {/* Candidates in this stage */}
              {candidates.filter(c => c.stage === stage).map(c => (
                <div key={c.id} className="bg-white rounded shadow p-2 mb-2">{c.name}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Profile Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">{selectedCandidate.name}</h2>
            <p className="mb-2 text-gray-600">{selectedCandidate.email}</p>
            <div className="mb-4">
              <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs">{selectedCandidate.stage.charAt(0).toUpperCase() + selectedCandidate.stage.slice(1)}</span>
              <span className="ml-2 px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">{jobs.find(j => j.id === selectedCandidate.jobId)?.title}</span>
            </div>
            <h3 className="font-semibold mb-2">Timeline (Status Changes)</h3>
            <ul className="mb-4 text-sm text-gray-600">
              {selectedCandidate.timeline.map((t, idx) => (
                <li key={idx}>{t.stage.charAt(0).toUpperCase() + t.stage.slice(1)} - {t.date}</li>
              ))}
            </ul>
            <h3 className="font-semibold mb-2">Notes (@mentions)</h3>
            {selectedCandidate.notes.map((note, idx) => (
              <div key={idx} className="border rounded p-2 mb-2">{note}</div>
            ))}
            <form
              className="flex space-x-2 mt-2"
              onSubmit={e => {
                e.preventDefault();
                if (!noteInput.trim()) return;
                updateCandidate(selectedCandidate.id, { notes: [...selectedCandidate.notes, noteInput.trim()] }, jobs);
                setCandidates(getCandidates(jobs));
                setSelectedCandidate({ ...selectedCandidate, notes: [...selectedCandidate.notes, noteInput.trim()] });
                setNoteInput("");
              }}
            >
              <input
                className="border px-3 py-2 rounded-md flex-1"
                placeholder="Add a note with @mention..."
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
              />
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add</button>
            </form>
            <button className="mt-4 px-4 py-2 bg-gray-200 rounded" onClick={() => setSelectedCandidate(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidatesPage;
