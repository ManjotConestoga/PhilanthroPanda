import * as React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Box,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

//import useJobs from "../constants/jobs.js";

export default function JobDescription() {
  const [searchParams] = useSearchParams();
  const [job, setJobs] = useState([]);
  const [applicationMessage, setApplicationMessage] = useState(null); // State to store application message
  const [userId, setUserId] = useState(null); // State to store userId
  const [alertVisible, setAlertVisible] = useState(false); // State to manage alert visibility

  const [statusInfo, setStatusInfo] = useState(null); // State to store status info
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [applied, setApplied] = useState(false); // State to track if user has applied
  const [accepted, setAccepted] = useState(false);

  const id = searchParams.get("id");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/jobdescription/${id}`
        );
        const data = await response.json();
        setJobs(data[0]);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    const fetchUserDetails = () => {
      const token = localStorage.getItem("token");
      // console.log(token);
      if (token) {
        // console.log("token exists");
        try {
          const decodedToken = jwtDecode(token); // Decode JWT token using jwt-decode

          // console.log(decodedToken);
          // console.log(decodedToken.id);
          setUserId(decodedToken.id);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };
    fetchUserDetails();
    fetchJob();
  }, []);

  // Fetch user details (decode JWT)

  // Check if user has already applied for this job
  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (!userId) return;

      const trackUrl = `http://127.0.0.1:3001/trackStatus/${id}`;

      try {
        const response = await fetch(trackUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });
        const data = await response.json();
        // console.log("runed");
        // console.log(data);
        if (data.length > 0) {
          setApplied(true);
          if(data[0].status == 'accepted'){
            setAccepted(true);
          }
          // console.log("applied");
        } else {
          setApplied(false);
        }
      } catch (error) {
        console.error("Error fetching application status:", error);
      }
    };
    checkApplicationStatus();
  }, [userId, id]);

  const handleApplyClick = async () => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    const applyUrl = `http://127.0.0.1:3001/apply/${id}`;

    try {
      const response = await fetch(applyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });
      const data = await response.json();

      if (response.ok) {
        setApplied(true); // User has successfully applied
      }

      setApplicationMessage(data.message); // Set message
      setAlertVisible(true); // Show the alert

      // Hide the alert after 3 seconds
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTrackProgressClick = async () => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    const trackUrl = `http://127.0.0.1:3001/trackStatus/${id}`;

    try {
      const response = await fetch(trackUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });
      const data = await response.json();
      // console.log(data); // Handle the fetched status data
      // console.log(data[0].status);
      // You can show the status data using an alert or a modal

      setStatusInfo(data[0]); // Store the status info
      setModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching application status:", error);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <ResponsiveAppBar></ResponsiveAppBar>
      {alertVisible && (
        <Alert
          severity={
            applicationMessage.includes("successfully") ? "success" : "error"
          }
          sx={{
            position: "fixed",
            top: 5,
            width: "90%",
            zIndex: 1200,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {applicationMessage}
        </Alert>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Card sx={{ maxWidth: 900 }}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" component="div">
                {job.title}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                {job.company}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                Location : {job.location}
              </Typography>
              <Typography
                sx={{
                  maxheight: "400px", // set your desired height
                  overflowY: "auto", // enable vertical scrolling
                  padding: "10px", // optional padding
                  border: "1px solid #ccc", // optional border for better visibility
                  borderRadius: "4px", // optional border radius
                }}
                variant="body2"
                color="text.secondary"
              >
                {job.description}
              </Typography>
              <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
                Skills Required : {job.skills}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              ml: 20,
              gap: 2,
              mr: 20,
              mt: 5,
              mb: 5,
            }}
          >
            {!applied && !accepted && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleApplyClick}
              >
                Apply Now
              </Button>
            )}
            {applied && !accepted && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleTrackProgressClick}
              >
                Track Progress
              </Button>
            )}
            {applied && accepted && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleTrackProgressClick}
              >
                You are Hired!
              </Button>
            )}
          </Box>
        </Card>
      </Box>

      {/* Modal Dialog */}
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>Application Status</DialogTitle>
        <DialogContent>
          {statusInfo && (
            <Box sx={{ mt: 2 }}>
              <DialogContentText>
                <strong>Title:</strong> {statusInfo.title}
              </DialogContentText>
              <DialogContentText sx={{ mt: 2 }}>
                <strong>Company:</strong> {statusInfo.company}
              </DialogContentText>
              <DialogContentText sx={{ mt: 2 }}>
                <strong>Application Date:</strong>{" "}
                {new Date(statusInfo.application_date).toLocaleDateString()}
              </DialogContentText>
              <DialogContentText sx={{ mt: 2 }}>
                <strong>Status:</strong>
                <span
                  style={{
                    color:
                      statusInfo.status === "pending"
                        ? "orange"
                        : statusInfo.status === "accepted"
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                    marginLeft: 3,
                  }}
                >
                  {statusInfo.status}
                </span>
              </DialogContentText>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
