import { useEffect, useState } from "react";
// const React = require("react")
import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import JobCard from "./components/JobCard";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

const App = ({ selectJob }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/jobs"); // Use full URL if necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // const response = await fetch("/api/jobs");
        const data = await response.json();
        console.log("Fetched jobs:", data); // Debugging log
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="App">
      <ResponsiveAppBar />
      <Box sx={{ my: 2, mx: 30 }}>
        <Grid container spacing={2}>
          {jobs.map((item) => (
            <Grid
              item
              xs={6}
              key={item.id}
              id={item.id}
              onClick={() => selectJob(item.id)}
            >
              <JobCard
                title={item.title}
                description={item.description}
                company={item.company}
                imageurl={item.imageurl}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default App;
