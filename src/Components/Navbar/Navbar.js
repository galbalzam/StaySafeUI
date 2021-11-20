import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Navbar.css";
import "firebase/auth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userData = useSelector((state) => state.userData);
  if (userData.isOwner) {
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
              <Link to="/editOffers">EDIT OFFERS</Link>
            </Button>
          </div>
          <div className="navbar-button-container">
            <Button color="primary">
              <Link to="/editUsers">EDIT Users</Link>
            </Button>
          </div>
        </div>

        <div className="right-side-navbar">
          <Typography align="left" style={{ marginRight: '10px' }}>Hello {userData.firstName} </Typography>
          <Divider orientation="vertical" flexItem />
          <Button color="primary">
            <Link to="/logout">Log Out</Link>
          </Button>
        </div>
      </div>
    )

  }

  if (userData.isAdmin) {
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
              <Link to="/editOffers">EDIT OFFERS</Link>
            </Button>
          </div>
        </div>

        <div className="right-side-navbar">
          <Typography align="left" style={{ marginRight: '10px' }}>Hello {userData.firstName} </Typography>
          <Divider orientation="vertical" flexItem />
          <Button color="primary">
            <Link to="/logout">Log Out</Link>
          </Button>
        </div>
      </div>
    )
  }

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
        <Typography align="left" style={{ marginRight: '10px' }}>Hello {userData.firstName} </Typography>
        <Divider orientation="vertical" flexItem />
        <Button color="primary">
          <Link to="/logout">Log Out</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
