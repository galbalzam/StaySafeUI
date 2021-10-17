import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Navbar.css";
import firebase from "firebase/app";
import "firebase/auth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [user, setUser] = useState(
    firebase.auth().currentUser && firebase.auth().displayName
  );
  const username = useSelector((state) => state.username);

  return (
    <div className="navbar">
      <div className="navbar-buttons-section">
        <div className="navbar-button-container">
          <Button color="primary">
            <Link to="/">Home</Link>
          </Button>
        </div>

        {/* If the user is not logged in, display this section. Else, hide it */}
        <div className="navbar-login-register-buttons-container">
          <div className="navbar-button-container">
            <Button color="primary">
              <Link to="/login">Login</Link>
            </Button>
          </div>

          <div className="navbar-button-container">
            <Button color="primary">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
        {/* =================================================================== */}

        <div className="navbar-button-container">
          <Button color="primary">
            <Link to="/about">About</Link>
          </Button>
        </div>
      </div>

      <div className="right-side-navbar">
        <Typography align="right">שלום, {username}</Typography>
      </div>
    </div>
  );
};

export default Navbar;
