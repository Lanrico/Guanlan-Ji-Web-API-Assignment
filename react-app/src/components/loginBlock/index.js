import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import Alert from "@mui/material/Alert";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import SignUp from "../signUpBlock";

const theme = createTheme();

export default function LoginBlock() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [failContent, setFailContent] = useState("");
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [userName, setUserName] = useState("");
  const firebaseConfig = {
    apiKey: "AIzaSyBuCt1AzgifZ98mO8IMvHe7fBqLUT1H5kw",
    authDomain: "movies-guanlan-ji.firebaseapp.com",
    projectId: "movies-guanlan-ji",
    storageBucket: "movies-guanlan-ji.appspot.com",
    messagingSenderId: "1080962489218",
    appId: "1:1080962489218:web:5e6e9e8218312990338d9b",
    measurementId: "G-QFTQJVEKHT"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        setOpenSuccess(true);
        setLogin(true);
        setUserName(user.email);
        // ...
      })
      .catch((error) => {
        setFailContent("Invalid email or password")
        setOpenFail(true);
      });
    event.preventDefault();
  };
  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('readPolicies'))
    if (data.get('reEnterPassword') !== data.get('password')) {
      setFailContent("The passwords entered twice are not the same")
      setOpenFail(true);
    }
    else if (data.get('readPolicies') === null){
      setFailContent("Please agree our policies")
      setOpenFail(true);
    }
    else {
      createUserWithEmailAndPassword(auth, data.get('email'), data.get('password'))
        .then((userCredential) => {
          const user = userCredential.user;
          setOpenSuccess(true);
          handleLogin();
          handleNoSignUp();
          setUserName(user.email);
        })
        .catch((error) => {
          setFailContent("Invalid email form or password less than 6 characters")
          setOpenFail(true);
        })
    }
  };

  const handleSuccessSnackClose = (event) => {
    setOpenSuccess(false);
  };
  const handleSignUpButton = (event) => {
    setSignUp(true);
  }
  const handleNoSignUp = (event) => {
    setSignUp(false);
  }
  const handleLeaveSignUpButton = (event) => {
    setSignUp(false);
  }
  const handleLogout = (event) => {
    setLogin(false);
  };
  const handleLogin = (event) => {
    setLogin(true);
  };
  const handleFailSnackClose = (event) => {
    setOpenFail(false);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <div style={signUp ? { display: "none" } : null}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSuccess}
          onClose={handleSuccessSnackClose}
        >
          <Alert
            severity="success"
            onClose={handleSuccessSnackClose}
          >
            <Typography variant="h5">
              Login success
            </Typography>
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openFail}
          onClose={handleFailSnackClose}
        >
          <Alert
            severity="error"
            onClose={handleFailSnackClose}
          >
            <Typography variant="h5">
              {failContent}
            </Typography>
          </Alert>
        </Snackbar>
        <Container component="main" maxWidth="xs" sx={login ? { display: "none" } : null}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: purple[500], width: 75, height: 75 }}>
              <LoginIcon fontSize='large' />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="emailLogin"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="passwordLogin"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me for 30 days"
              />
              <ColorButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: purple[500] }}
              >
                Sign In
              </ColorButton>
              <Grid container>
                <Grid item sx={{ justifyContent: 'center', margin: 'auto' }}>
                  <Link onClick={handleSignUpButton} variant="body2" style={{ cursor: "pointer", color: purple[500] }}>
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Container sx={login ? null : { display: "none" }} >
          <Typography textAlign={'center'} variant="h4" >
            Welcome,
            <br></br>
            {userName}!
          </Typography>
          <ColorButton
            fullWidth
            onClick={handleLogout}
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: purple[500] }}
          >
            Logout
          </ColorButton>
        </Container>
      </div>
      <div style={signUp ? null : { display: "none" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSuccess}
          onClose={handleSuccessSnackClose}
        >
          <Alert
            severity="success"
            onClose={handleSuccessSnackClose}
          >
            <Typography variant="h5">
              Sign up success
            </Typography>
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openFail}
          onClose={handleFailSnackClose}
        >
          <Alert
            severity="error"
            onClose={handleFailSnackClose}
          >
            <Typography variant="h5">
              {failContent}
            </Typography>
          </Alert>
        </Snackbar>

        <SignUp action1={handleLeaveSignUpButton} action2={handleSignUpSubmit} />
      </div>
    </ThemeProvider>
  );
}