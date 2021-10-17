import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { register } from "../../../Services/auth.service";
import "./Register.css";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import config from "../../../Services/firebaseConfig";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onRegisterClick = async () => {
    // await register(username, password, firstName, lastName, phoneNumber);
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);

    const user = firebase.auth().currentUser;
    console.log("===============");
    console.log(user);
  };

  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div className="registerPageContainer">
        <h1 className="headerSection">הרשמה</h1>

        <div className="registerInputsSection">
          <form noValidate autoComplete="off" className="registerInputsForm">
            <div className="inputContainer">
              <TextField
                id="register-username-field"
                label="Email"
                variant="outlined"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="inputContainer">
              <TextField
                id="register-password-field"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="inputContainer">
              <TextField
                id="register-password-field"
                label="First name"
                autoComplete="current-password"
                variant="outlined"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>

            <div className="inputContainer">
              <TextField
                id="register-last-name-field"
                label="Last name"
                autoComplete="current-password"
                variant="outlined"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>

            <div className="inputContainer">
              <TextField
                id="register-phone-number-field"
                label="Phone number"
                autoComplete="current-password"
                variant="outlined"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </div>
          </form>
        </div>

        <Button variant="contained" color="primary" onClick={onRegisterClick}>
          Register
        </Button>
      </div>
    </FirebaseAuthProvider>
  );
};

export default Register;
