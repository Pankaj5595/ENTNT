// Simple localStorage CRUD for assessments
const ASSESSMENTS_KEY = 'talentflow_assessments';
const questionTypes = ['Single Choice','Multi Choice','Short Text','Long Text','Numeric (Range)','File Upload (Stub)'];
function seedAssessments(jobs) {
  const assessments = [];
  for (let i = 0; i < 3; i++) {
    const job = jobs[i];
    const questions = [];
    for (let q = 1; q <= 10; q++) {
      questions.push({
        id: q,
        text: `Question ${q} for ${job.title}`,
        type: questionTypes[q % questionTypes.length],
        required: q % 2 === 0,
        options: q % 2 === 0 ? ['Option 1','Option 2','Option 3'] : [],
        conditional: q === 3 ? { dependsOn: 1, value: 'Yes' } : null
      });
    }
    assessments.push({
      jobId: job.id,
      jobTitle: job.title,
      questions
    });
  }
  localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(assessments));
  return assessments;
}
export function getAssessments(jobs) {
  let assessments = JSON.parse(localStorage.getItem(ASSESSMENTS_KEY));
  if (!assessments) assessments = seedAssessments(jobs);
  return assessments;
}
export function saveAssessments(assessments) {
  localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(assessments));
}
export function getAssessmentByJobId(jobId, jobs) {
  return getAssessments(jobs).find(a => a.jobId === jobId);
}
export function updateAssessment(jobId, updates, jobs) {
  const assessments = getAssessments(jobs).map(a => a.jobId === jobId ? { ...a, ...updates } : a);
  saveAssessments(assessments);
}
