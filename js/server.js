// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { ADZUNA_APP_ID, ADZUNA_API_KEY } from "./config.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow all browsers to call this server
app.use(cors());

// Endpoint to get jobs
app.get("/jobs", async (req, res) => {
    const keyword = req.query.keyword || "developer";
    const location = req.query.location || "us";

    const url = `https://api.adzuna.com/v1/api/jobs/${location}/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=10&what=${encodeURIComponent(keyword)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data.results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
