import React, { useState, createContext } from "react";
import { getUserRecommend, login, signup } from "../api/web-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");
  const [recommendMovies, setRecommendMovies] = useState([]);

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);

    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
      const r = await getUserRecommend(username)
      setRecommendMovies(r);
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
        setRecommendMovies,
        userName,
        recommendMovies
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;