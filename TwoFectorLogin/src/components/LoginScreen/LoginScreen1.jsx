import React from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import { LockOutlined, EmailOutlined } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginScreen1 = () => {
  const navigate = useNavigate();

  // Formik form submission and validation logic Here
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email('Invalid email format')
        .required('Email is required')
        .matches(/^[a-zA-Z][a-zA-Z0-9]*@gmail\.com$/, 'Email must start with a letter and be @gmail.com'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must not exceed 20 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
    }),
     // Send login request to backend
    onSubmit: async (values) => {
      try {
        const response = await axios.get(`http://localhost:4005/users?email=${values.email}&password=${values.password}`);
        
        if (response.data.length === 1) {
          const user = response.data[0];
          const userId = user.id;
          localStorage.setItem('user', JSON.stringify(user));
          
          if (user.role === 'student') {
            const code = Math.floor(1000 + Math.random() * 9000);
            await axios.patch(`http://localhost:4005/users/${userId}`, { code: code.toString() });
            navigate(`/login2/${userId}`);
          } else if (user.role === 'admin') {
            navigate('/admin-dashboard');
          }
        } else {
          toast.error('Invalid credentials');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error logging in');
      }
    }
  });

  //Html code
  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                type="text"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <EmailOutlined color="action" />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
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
                type="submit"
                startIcon={<LockOutlined />}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Don't have an account? <Link to="/register">Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginScreen1;
