export function saveJob(job) {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    savedJobs.push(job);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
}
