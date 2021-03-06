import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Navbar.css";
import "firebase/auth";
import { useSelector } from "react-redux"

const Navbar = () => {
  const userData = useSelector(state => state.userData);
  console.log(userData)
  return (
    <div className="navbar">
      <div className="navbar-buttons-section">
        <div className="navbar-button-container">
          <Button color="primary">
            <Link to="/">Home</Link>
          </Button>
        </div>
        <div className="navbar-button-container">
          <Button color="primary">
            <Link to="/AddOffer">Add New Offer</Link>
          </Button>
        </div>
        <div className="navbar-button-container">
          <Button color="primary">
            <Link to="/about">About</Link>
          </Button>
        </div>
      </div>

      <div className="right-side-navbar">
        <Typography align="left">hello {userData.firstName} </Typography>
      </div>
    </div>
  );
};

export default Navbar;
