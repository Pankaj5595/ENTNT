import React, { useState, useEffect } from "react";
import { getJobs } from "../utils/jobsStorage";
import { getAssessments, updateAssessment } from "../utils/assessmentsStorage";

function AssessmentsPage() {
  const [jobs, setJobs] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("Single Choice");
  const [response, setResponse] = useState({});

  useEffect(() => {
    const jobsData = getJobs();
    setJobs(jobsData);
    setAssessments(getAssessments(jobsData));
    if (jobsData.length > 0) setSelectedJobId(jobsData[0].id);
  }, []);

  const selectedAssessment = assessments.find(a => a.jobId === selectedJobId);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Assessment Builder</h1>

      {/* Select Job */}
      <div className="mb-6">
        <label className="font-semibold mr-2">Select Job:</label>
        <select className="border px-3 py-2 rounded-md" value={selectedJobId} onChange={e => setSelectedJobId(Number(e.target.value))}>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>{job.title}</option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Questions</h2>
        <div className="bg-white rounded-lg shadow divide-y">
          {selectedAssessment?.questions.map(q => (
            <div key={q.id} className="px-6 py-4 flex justify-between items-center">
              <div>
                <span className="font-semibold">{q.text}</span>
                <span className="ml-2 px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs">{q.type}</span>
                {q.required && <span className="ml-2 px-2 py-1 rounded bg-red-100 text-red-700 text-xs">Required</span>}
                {q.conditional && <span className="ml-2 px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">Conditional</span>}
              </div>
              {/* Edit button stub */}
            </div>
          ))}
        </div>
        {/* Add Question Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Add Question</h2>
          <form className="flex space-x-4" onSubmit={e => {
            e.preventDefault();
            if (!questionText.trim()) return;
            const newQuestion = {
              id: Date.now(),
              text: questionText,
              type: questionType,
              required: false,
              options: questionType.includes("Choice") ? ["Option 1", "Option 2"] : [],
            };
            updateAssessment(selectedJobId, {
              questions: [...(selectedAssessment?.questions || []), newQuestion]
            }, jobs);
            setAssessments(getAssessments(jobs));
            setQuestionText("");
            setQuestionType("Single Choice");
          }}>
            <input className="border px-3 py-2 rounded-md" placeholder="Question text..." value={questionText} onChange={e => setQuestionText(e.target.value)} />
            <select className="border px-3 py-2 rounded-md" value={questionType} onChange={e => setQuestionType(e.target.value)}>
              {["Single Choice","Multi Choice","Short Text","Long Text","Numeric (Range)","File Upload (Stub)"].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 transition">Add</button>
          </form>
        </div>
      </div>

      {/* Live Preview Pane */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <form className="space-y-4" onSubmit={e => {
            e.preventDefault();
            localStorage.setItem(`assessment_response_${selectedJobId}`, JSON.stringify(response));
            alert("Assessment submitted!");
            setResponse({});
          }}>
            {selectedAssessment?.questions.map(q => (
              <div key={q.id}>
                <label className="block font-semibold mb-1">{q.text}</label>
                {q.type === "Single Choice" || q.type === "Multi Choice" ? (
                  <select className="border px-3 py-2 rounded-md w-full" value={response[q.id] || ""} onChange={e => setResponse(r => ({ ...r, [q.id]: e.target.value }))}>
                    {q.options.map((opt, idx) => (
                      <option key={idx}>{opt}</option>
                    ))}
                  </select>
                ) : q.type === "Short Text" || q.type === "Long Text" ? (
                  <input className="border px-3 py-2 rounded-md w-full" placeholder="Enter answer..." value={response[q.id] || ""} onChange={e => setResponse(r => ({ ...r, [q.id]: e.target.value }))} />
                ) : q.type === "Numeric (Range)" ? (
                  <input type="number" className="border px-3 py-2 rounded-md w-full" placeholder="Enter number..." value={response[q.id] || ""} onChange={e => setResponse(r => ({ ...r, [q.id]: e.target.value }))} />
                ) : q.type === "File Upload (Stub)" ? (
                  <input type="file" className="border px-3 py-2 rounded-md w-full" disabled />
                ) : null}
              </div>
            ))}
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Submit Assessment</button>
          </form>
        </div>
      </div>

      {/* Validation & Conditional Logic Placeholder */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Validation & Conditional Logic</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Required fields</li>
          <li>Numeric range validation</li>
          <li>Max length validation</li>
          <li>Conditional questions (e.g., show Q3 only if Q1 === "Yes")</li>
        </ul>
      </div>
    </div>
  );
}

export default AssessmentsPage;
