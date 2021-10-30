import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Navbar.css";
import "firebase/auth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userData = useSelector((state) => state.userData);
  return (
    <div className="navbar">
      <div className="navbar-buttons-section">
        <div className="navbar-button-container">
          <Button color="primary">
            <Link to="/">StaySafe</Link>
          </Button>
        </div>
        <div className="navbar-button-container">
          <Button color="primary">
            <Link to="/AddOffer">New Offer</Link>
          </Button>
        </div>
        <div className="navbar-button-container">
          <Button color="primary">
            <Link to="/MyOffer">My Offer</Link>
          </Button>
        </div>
        <div className="navbar-button-container">
          <Button color="primary">
            <Link to="/contacts">Contacts</Link>
          </Button>
        </div>
        <div className="navbar-button-container">
          <Button color="primary">
            <Link to="/about">About</Link>
          </Button>
        </div>
      </div>

      <div className="right-side-navbar">
        <Typography align="left">Hello {userData.firstName} </Typography>
      </div>
    </div>
  );
};

export default Navbar;
