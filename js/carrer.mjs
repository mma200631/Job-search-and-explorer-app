export function displayCareerInfo(careers, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (!careers || careers.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>No career found 😢</h3>
                <p>Try searching with different keywords.</p>
            </div>
        `;
        return;
    }

    careers.forEach(career => {
        const card = document.createElement("div");
        card.classList.add("career-card");

        card.innerHTML = `
            <h2>${career.title}</h2>
            <p><strong>Salary:</strong> ${career.salary}</p>
            <p><strong>Job Outlook:</strong> ${career.outlook}</p>

            <div class="career-section">
                <h4>Skills</h4>
                <ul>
                    ${career.skills.map(skill => `<li>${skill}</li>`).join("")}
                </ul>
            </div>

            <div class="career-section">
                <h4>Tasks</h4>
                <ul>
                    ${career.tasks.map(task => `<li>${task}</li>`).join("")}
                </ul>
            </div>
        `;

        container.appendChild(card);
    });
}
