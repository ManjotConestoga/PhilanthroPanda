// server.js

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001; // Change the port if necessary

const db = require("../constants/db");
app.use(cors()); // Enable CORS
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await db.query("SELECT * FROM jobs");
    res.json(jobs.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
