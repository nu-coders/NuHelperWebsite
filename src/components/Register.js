import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleButton from 'react-google-button'
import Copyright from "./CopyRight";
import axios from "axios";


const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(false);
  
  const handleSubmit = (event) => {

    event.preventDefault();
    if(!otp){
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username') ,
      phoneNumber: data.get('phone')

    });
    axios.post('https://auth.nucoders.dev/production/signup', {
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username') ,
      phoneNumber: data.get('phone')
    }).then((response) => {
      console.log(response);
      setOtp(true);
    }, (error) => {
      console.log(error);
    });
  }
  else if(otp){
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username') ,
      phoneNumber: data.get('phone'),
      otp: data.get('otp')
    });
    axios.post('https://auth.nucoders.dev/production/verifyemail', {
      email: data.get('email'),
      verificationCode: data.get('otp')
    }).then((response) => {
      console.log(response);
      setOtp(true);
      navigate("/signin")
    }, (error) => {
      console.log(error);
    });
  }


    //TODO Register Function  registerWithEmailAndPassword(data.get('firstName') + ' ' + data.get('lastName'), data.get('email'), data.get('password'));
  };
  const [user, loading, error] = 'TODO';
  // const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [user, loading]);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                
              </Grid>
              {otp &&<Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="otp"
                  label="otp"
                  type="password"
                  id="otp"
                />
                
              </Grid>}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {/* <GoogleButton
                // TODO sign in with gmail onClick={() => { signInWithGoogle() }}
                /> */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}