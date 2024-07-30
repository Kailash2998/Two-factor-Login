import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import LoginScreen1 from './components/LoginScreen/LoginScreen1';
import LoginScreen2 from './components/LoginScreen/LoginScreen2';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Footer from './Footer/Footer';
import PrivateRoute from './components/Routes/PrivateRoute';
import RegistrationForm from './components/Register/RegistrationForm';
import ProfileForm from './Profile/ProfileForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, CssBaseline } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Container style={{ flexGrow: 1, marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<LoginScreen1 />} />
            <Route path="/login2/:userId" element={<LoginScreen2 />} />
            <Route path="/student-dashboard/:userId" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
            <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/register" element={<RegistrationForm />} /> 
            <Route path="/profile" element={<ProfileForm />} />
          </Routes>
        </Container>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
