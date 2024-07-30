import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await axios.get(`http://localhost:4005/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Navigate to student dashboard with user ID
  const handleGoBack = () => {
    if (user.role === 'student') {
      navigate(`/student-dashboard/${user.id}`); 
    } else if (user.role === 'admin') {
      navigate('/admin-dashboard'); 
    } else {
      // Handle other roles or fallback navigation
      navigate('/');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Container>
    );
  }

  //html code for the above code
  return (
    <Container maxWidth="md" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>First Name:</strong> {user.firstName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Last Name:</strong> {user.lastName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Role:</strong> {user.role}
        </Typography>
        {/* Add more fields as per your user data */}
        <Button variant="contained" color="primary" onClick={handleGoBack} style={{ marginTop: '20px' }}>
          Go Back to Dashboard
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
