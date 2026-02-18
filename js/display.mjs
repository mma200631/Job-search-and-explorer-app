export function displayJobs(jobs, containerId = "results-container") {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (!jobs.length) {
        container.innerHTML = "<p>No jobs found.</p>";
        return;
    }

    jobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company.display_name}</p>
            <p><strong>Location:</strong> ${job.location.display_name}</p>
            <p><strong>Salary:</strong> ${
                job.salary_min ? "$" + job.salary_min.toFixed(0) : "N/A"
            } - ${
                job.salary_max ? "$" + job.salary_max.toFixed(0) : "N/A"
            }</p>
            <p>${job.description.substring(0, 120)}...</p>
            <a href="${job.redirect_url}" target="_blank">View Job</a>
            <button class="save-job">Save Job</button>
        `;

        container.appendChild(card);
    });
}
