// Simple localStorage CRUD for candidates
const CANDIDATES_KEY = 'talentflow_candidates';
const stages = ['applied','screen','tech','offer','hired','rejected'];
const names = ['Alice Smith','Bob Johnson','Charlie Lee','Diana Patel','Ethan Brown','Fiona Clark','George Kim','Hannah Liu','Ivan Petrov','Julia Gomez','Kevin Wang','Linda Tran','Mike Davis','Nina Singh','Oscar Rivera','Priya Shah','Quentin Fox','Rita Chen','Samir Gupta','Tina Lopez','Uma Desai','Victor Cruz','Wendy Zhou','Xander Park','Yara Ali','Zane Miller'];
function randomEmail(name) {
  return name.toLowerCase().replace(/\s+/g, '.') + '@example.com';
}
function seedCandidates(jobs) {
  const candidates = [];
  for (let i = 1; i <= 1000; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const email = randomEmail(name);
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const job = jobs[Math.floor(Math.random() * jobs.length)];
    candidates.push({
      id: i,
      name,
      email,
      stage,
      jobId: job.id,
      timeline: [{ stage, date: '2025-09-01' }],
      notes: []
    });
  }
  localStorage.setItem(CANDIDATES_KEY, JSON.stringify(candidates));
  return candidates;
}
export function getCandidates(jobs) {
  let candidates = JSON.parse(localStorage.getItem(CANDIDATES_KEY));
  if (!candidates) candidates = seedCandidates(jobs);
  return candidates;
}
export function saveCandidates(candidates) {
  localStorage.setItem(CANDIDATES_KEY, JSON.stringify(candidates));
}
export function addCandidate(candidate, jobs) {
  const candidates = getCandidates(jobs);
  const newCandidate = { ...candidate, id: Date.now() };
  candidates.push(newCandidate);
  saveCandidates(candidates);
  return newCandidate;
}
export function updateCandidate(id, updates, jobs) {
  const candidates = getCandidates(jobs).map(c => c.id === id ? { ...c, ...updates } : c);
  saveCandidates(candidates);
}
export function getCandidateById(id, jobs) {
  return getCandidates(jobs).find(c => c.id === id);
}
