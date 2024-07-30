import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/', { replace: true });
    window.location.reload();
  };

  const isAuthenticated = !!localStorage.getItem('user');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My Application
        </Typography>
        {!isAuthenticated && (
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        )}
        {isAuthenticated && (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="account"
              component={Link}
              to="/profile"
            >
              <AccountCircle />
            </IconButton>
            <Typography variant="body1" style={{ marginRight: '10px', color: 'white' }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
