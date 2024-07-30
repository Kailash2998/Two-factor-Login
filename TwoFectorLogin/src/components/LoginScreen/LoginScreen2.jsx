import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import { LockOutlined } from '@mui/icons-material'; 
import { toast } from 'react-toastify';
import * as Yup from 'yup';

//Declear the data using const
const LoginScreen2 = () => {
  const { userId } = useParams();
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const [codeError, setCodeError] = useState('');

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    code: Yup.string().required('Code is required'),
  });

  const handleCodeSubmit = async () => {
    try {
      await validationSchema.validate({ code }, { abortEarly: false });

      const response = await axios.get(`http://localhost:4005/users/${userId}`);
      if (response.data.code === code) {
        navigate(`/student-dashboard/${userId}`);
      } else {
        toast.error('Incorrect code. Please try again.');
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        error.inner.forEach(err => {
          if (err.path === 'code') {
            setCodeError(err.message);
          }
        });
      } else {
        console.error('Error:', error);
        toast.error('Error logging in');
      }
    }
  };

  //Html code for the above code
  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Enter Verification Code
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              label="Verification Code"
              variant="outlined"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              error={Boolean(codeError)}
              helperText={codeError}
              InputProps={{
                startAdornment: (
                  <LockOutlined color="action" />
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCodeSubmit}
              startIcon={<LockOutlined />}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default LoginScreen2;
