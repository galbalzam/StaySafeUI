import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { login } from "../../../Services/auth.service";
import "./Login.css";
import { useDispatch } from "react-redux";
import { tempLogin } from "../../../redux/authReducer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  const onLoginClick = async () => {
    // const results = await login(username, password);
    dispatch(tempLogin());
  };

  return (
    <div className="loginPageContainer">
      <h1 className="headerSection">ברוכים הבאים</h1>

      <div className="loginInputsSection">
        <form noValidate autoComplete="off" className="loginInputsForm">
          <div className="inputContainer">
            <TextField
              id="login-username-field"
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="inputContainer">
            <TextField
              id="login-password-field"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </form>
      </div>

      <Button variant="contained" color="primary" onClick={onLoginClick}>
        Login
      </Button>
    </div>
  );
};

export default Login;
