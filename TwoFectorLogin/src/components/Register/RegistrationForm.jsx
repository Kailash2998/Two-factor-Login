import React from 'react';
import { Container, TextField, Button, Typography, Grid,  } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AccountCircle, MailOutline, LockOutlined, PersonAdd } from '@mui/icons-material'; // Importing icons

const RegistrationForm = () => {
  const navigate = useNavigate();

  // Formik form submission and validation logic Here
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .trim()
        .required('First Name is required')
        .matches(/^[a-zA-Z\s]*$/, 'Only alphabets and spaces are allowed')
        .min(2, 'First Name must be at least 2 characters')
        .max(50, 'First Name must not exceed 50 characters'),
      lastName: Yup.string()
        .trim()
        .required('Last Name is required')
        .matches(/^[a-zA-Z\s]*$/, 'Only alphabets and spaces are allowed')
        .min(2, 'Last Name must be at least 2 characters')
        .max(50, 'Last Name must not exceed 50 characters'),
      email: Yup.string()
        .trim()
        .email('Invalid email format')
        .required('Email is required')
         .matches(/^[a-z][a-z0-9]*@gmail\.com$/, 'Email must start with a letter and be @gmail.com'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must not exceed 20 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
    }),
    // Save user to database
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:4005/users', {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          role: 'student' 
        });

        //Applt the Toaster for Notify success and redirect to login page
        toast.success('Registration successful');
        navigate('/');
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error registering user');
      }
    }
  });

  //Html code for the Above code
  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Registration
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                InputProps={{
                  startAdornment: <AccountCircle color="action" />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                InputProps={{
                  startAdornment: <AccountCircle color="action" />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                type="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: <MailOutline color="action" />,
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
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  startAdornment: <LockOutlined color="action" />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<PersonAdd />}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                Already have an account? <Link to="/">Login</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegistrationForm;
