import React, { useState, createContext } from "react";
import { login, signup } from "../api/web-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      console.log(authToken)
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
    }
    return (result.success === true) ? true : false;
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    return (result.code === 201) ? true : false;
  };

  const signOut = () => {
    setToken('');
    setAuthToken("123123");
    // setTimeout(() => setIsAuthenticated(false), 100);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout: signOut,
        userName
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;