import React, { useContext, useState } from "react";
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
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import SignUp from "../signUpBlock";
import { AuthContext } from "../authContext.js";

const theme = createTheme();

export default function LoginBlock() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [failContent, setFailContent] = useState("");
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [readPolicies, setReadPolicies] = useState("");

  const loginAuth = async () => {
    return(context.authenticate(userName, password));
  };

  const register = async () => {
    var i = context.register(userName, password);
    return i;
  }

  const handleSubmit = (event) => {
    loginAuth(userName, password)
      .then((response) => {
        if (response) {
          setOpenSuccess(true);
        }
        else {
          setFailContent('Invalid user name or password')
          setOpenFail(true);
        }
      })
    event.preventDefault();
  };
  const handleSignUpSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    if (data.get('userSignUp') === "" || data.get('password') === ""){
      setFailContent("User name or password can't be empty")
      setOpenFail(true);
    }
    else if (data.get('reEnterPassword') !== data.get('password')) {
      setFailContent("The passwords entered twice are not the same")
      setOpenFail(true);
    }
    else if (data.get('readPolicies') === null) {
      setFailContent("Please agree our policies")
      setOpenFail(true);
    }
    else {
      register()
        .then((response) => {
          console.log(response)
          if (response === true) {
            loginAuth(userName, password);
            setOpenSuccess(true);
            setSignUp(false);
          }
          else {
            setFailContent('The user name is already exist or your password is invalid.')
            setOpenFail(true);
          }
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
    context.signout();
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
          style={context.isAuthenticated && openSuccess? null : { display: "none" }}
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
          style={context.isAuthenticated || !openFail? { display: "none" } : null}

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
        <Container component="main" maxWidth="xs" sx={ context.isAuthenticated ? { display: "none" } : null}>
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
                id="userLogin"
                label="User Name"
                name="user"
                autoFocus
                onChange={e => {setUserName(e.target.value)}}
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
                onChange={e => {setPassword(e.target.value)}}
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
        <Container sx={context.isAuthenticated ? null : { display: "none" }} >
          <Typography textAlign={'center'} variant="h4" >
            Welcome,
            <br></br>
            {context.userName}!
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
      <div style={!context.isAuthenticated && signUp ? null : { display: "none" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSuccess}
          onClose={handleSuccessSnackClose}
          style={context.isAuthenticated && openSuccess? null : { display: "none" }}
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
          style={context.isAuthenticated || !openFail? { display: "none" } : null}
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

        <SignUp action1={handleLeaveSignUpButton} action2={handleSignUpSubmit} action3={setUserName} action4={setPassword} action5={setRePassword} action6={setReadPolicies}/>
      </div>
    </ThemeProvider>
  );
}