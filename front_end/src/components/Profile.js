import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null); 
  const [applicationMessage, setApplicationMessage] = useState(null); // State to store application message
  const [alertVisible, setAlertVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

// Fetch user details (decode JWT)

// Check if user has already applied for this job
  useEffect(() => {
      const populateProfile = async () => {
      if (!userId) return;

      const trackUrl = `http://localhost:3001/api/getprofile`;

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
            let split = data[0].name.split(" ");
            let firstName = split[0];
            let lastName = split[1];
            let email = data[0].email;
            let phone = data[0].phone;
            let address = data[0].address;
            setFormData({
              firstName: firstName,
              lastName: lastName,
              email: email,
              phone: phone,
              address: address
            });
          // console.log("applied");
          } 
      } catch (error) {
          console.error("Error Getting aaplied jobs:", error);
      }
      };
      populateProfile();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone Number is required';
    }
    formData.name = formData.firstName + ' ' + formData.lastName;
    formData.user_id = userId;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      // Handle form submission, e.g., send data to backend or display a success message
      try {
        const response = await fetch('http://localhost:3001/api/updateprofile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          setApplicationMessage('Profile Updated Succesfully'); // Set message
          setAlertVisible(true); // Show the alert

          // Hide the alert after 3 seconds
          setTimeout(() => {
            setAlertVisible(false);
          }, 3000);
        } else {
          const errorData = await response.json();
          setMessage(`Registration failed: ${errorData.message}`);
        }
      } catch (error) {
        setMessage(`Registration failed: ${error.message}`);
      }
    }
  };

  return (
    <div>
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
        <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="first-name"
              autoFocus
              value={formData.firstName}
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="last-name"
              value={formData.lastName}
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              value={formData.phone}
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                value={formData.address}
                onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
            {message && (
              <Typography color="error" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Profile;
