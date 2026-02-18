import { fetchJobs } from "./api.mjs";
import { displayJobs } from "./display.mjs";
import { displayCareerInfo } from "./carrer.mjs";
import { mockCareers } from "./mockcareer.mjs";
import { saveJob } from "./storage.mjs";


// ---------------- JOB SEARCH ----------------
const searchForm = document.getElementById("job-search-form");

if (searchForm) {
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const keyword = document.getElementById("keyword").value.trim();
        const location = document.getElementById("location").value.trim() || "us";

        if (!keyword) return;

        try {
            const jobs = await fetchJobs(keyword, location);
            displayJobs(jobs, "results-container");
            attachSaveButtons();
        } catch (error) {
            console.error(error);
            document.getElementById("results-container").innerHTML =
                "<p>Failed to load jobs. Please try again.</p>";
        }
    });
}


// ---------------- CAREER SEARCH ----------------
const careerForm = document.getElementById("career-search-form");

if (careerForm) {
    careerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const input = document.getElementById("career-keyword");
        const keyword = input.value.trim().toLowerCase();

        if (!keyword) {
            displayCareerInfo(mockCareers, "career-container");
            return;
        }

        const results = mockCareers.filter(career => {

            const words = keyword.split(" ");

            return words.every(word =>
                career.title.toLowerCase().includes(word) ||
                career.skills.some(skill =>
                    skill.toLowerCase().includes(word)
                ) ||
                career.tasks.some(task =>
                    task.toLowerCase().includes(word)
                )
            );
        });

        displayCareerInfo(results, "career-container");
    });
}


// ---------------- SHOW ALL CAREERS ON LOAD ----------------
const careerContainer = document.getElementById("career-container");

if (careerContainer) {
    displayCareerInfo(mockCareers, "career-container");
}


// ---------------- SAVE JOB BUTTONS ----------------
function attachSaveButtons() {
    const buttons = document.querySelectorAll(".save-job");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".job-card");

            if (!card) return;

            const jobData = {
                title: card.querySelector("h3")?.innerText || "",
                company: card.querySelector("p:nth-child(2)")?.innerText || "",
                location: card.querySelector("p:nth-child(3)")?.innerText || ""
            };

            saveJob(jobData);
            alert("Job saved successfully!");
        });
    });
}
