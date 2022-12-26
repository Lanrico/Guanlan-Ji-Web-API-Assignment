import { Typography, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from '../authContext.js'
import img from '../../images/Unauthenticate.webp'

const ProtectedRoutes = () => {

  const context = useContext(AuthContext);
  const location = useLocation();
  const theme = useTheme();
  return context.isAuthenticated === true ? (
    <Outlet />
  ) : (
    <Typography variant="h6" textAlign={"center"} sx={{ flexGrow: 1 }}>
      <br /><br />
      You can not access these content if you are not sign in.
      <br />
      <img src={img} alt="Unauthenticate"/>
      <br />
      Click <Link to={"/"} style={{ color: theme.palette.primary }}>here</Link> to sign in your account.
    </Typography>
  );
};

export default ProtectedRoutes;