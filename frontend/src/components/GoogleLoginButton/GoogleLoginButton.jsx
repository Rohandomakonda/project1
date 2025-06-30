import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const login = useGoogleLogin({
    onSuccess: onSuccess,
    onError: onError,
    scope: 'email profile https://www.googleapis.com/auth/calendar.events',
  });

  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={() => login()}
      fullWidth
      sx={{
        mt: 2,
        backgroundColor: '#4285F4',
        color: 'white',
        '&:hover': {
          backgroundColor: '#357ABD',
        },
      }}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;