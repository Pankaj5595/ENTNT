// Simple localStorage CRUD for jobs
const JOBS_KEY = 'talentflow_jobs';

function seedJobs() {
  const titles = [
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
  const tagsList = [
    ['React', 'UI'],
    ['Node', 'API'],
    ['Java', 'Spring'],
    ['AWS', 'CI/CD'],
    ['Design', 'Figma'],
    ['Testing', 'Jest'],
    ['SQL', 'Database'],
    ['Cloud', 'Docker'],
    ['Mobile', 'Flutter'],
    ['Leadership', 'Agile'],
  ];
  const jobs = [];
  const locations = ['Remote', 'New York', 'San Francisco', 'London', 'Berlin', 'Bangalore', 'Sydney', 'Toronto', 'Paris', 'Tokyo'];
  const salaries = ["$80k-$120k", "$100k-$150k", "$60k-$90k", "$120k-$180k", "$70k-$110k", "$90k-$130k", "$110k-$160k", "$95k-$140k", "$85k-$125k", "$105k-$155k"];
  for (let i = 1; i <= 25; i++) {
    const idx = Math.floor(Math.random() * titles.length);
    jobs.push({
      id: i,
      title: titles[idx],
      slug: titles[idx].toLowerCase().replace(/\s+/g, '-') + '-' + i,
      status: i % 5 === 0 ? 'archived' : 'active',
      tags: tagsList[idx],
      order: i,
      archived: i % 5 === 0,
      salary: salaries[idx],
      location: locations[idx]
    });
  }
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
  return jobs;
}

export function getJobs() {
  let jobs = JSON.parse(localStorage.getItem(JOBS_KEY));
  if (!jobs) jobs = seedJobs();
  return jobs;
}

export function saveJobs(jobs) {
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

export function addJob(job) {
  const jobs = getJobs();
  const newJob = { ...job, id: Date.now(), order: jobs.length + 1 };
  jobs.push(newJob);
  saveJobs(jobs);
  return newJob;
}

export function updateJob(id, updates) {
  const jobs = getJobs().map(j => j.id === id ? { ...j, ...updates } : j);
  saveJobs(jobs);
}

export function archiveJob(id, archived) {
  updateJob(id, { archived, status: archived ? 'archived' : 'active' });
}

export function reorderJobs(fromOrder, toOrder) {
  let jobs = getJobs();
  // Simple reorder logic
  jobs.sort((a, b) => a.order - b.order);
  const moved = jobs.find(j => j.order === fromOrder);
  jobs = jobs.filter(j => j.order !== fromOrder);
  jobs.splice(toOrder - 1, 0, moved);
  jobs.forEach((j, idx) => j.order = idx + 1);
  saveJobs(jobs);
}
