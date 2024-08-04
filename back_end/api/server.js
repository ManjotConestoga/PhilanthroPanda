const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.port || 3001;

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());

// Import routes
const jobsRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");
const applicationsRoutes = require("./routes/applications");
const profiles = require("./routes/profiles");

// Use routes
app.use(jobsRoutes);
app.use(authRoutes);
app.use(applicationsRoutes);
app.use(profiles);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
