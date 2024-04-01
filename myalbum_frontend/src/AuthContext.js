import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Perform login operation and update state
    const url = "http://localhost:3000/login";

    await axios
      .post(url, {
        email: email,
        password: password,
      })
      .then((res) => {
        setUser(email);
        sessionStorage.setItem("jwt", res.data.jwt);
        setTimeout(logout, 36000000); // Logout after 3600 seconds
        navigate("./protected");
      })
      .catch((err) => {
        if (err instanceof TypeError) {
          alert("Network error occurred. Check your internet connection.");
        } else {
          alert(err.response.data.error);
        }
      });
  };

  const logout = () => {
    // Perform logout operation
    setUser(null);
    sessionStorage.removeItem("jwt");
    // go to /login page <rounter>
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
