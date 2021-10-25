import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth.reducer";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../Validation/AuthInputValidation";
import { firebase } from "../../FireBase/initFireBase";
import "firebase/auth";
import { useHistory } from "react-router";
import { host } from "../../Services/host";
import { useForm } from "react-hook-form";

const initialValues = {
  email: "",
  password: "",
};

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const userDocRef = firebase.firestore().collection("users");
  const history = useHistory();
  let [user, setUser] = useState({});

  useEffect(() => {
    checkUser();
  }, []);

  const onSubmitForm = (data) => {
    onLogin(data);
  };

  const checkUser = async () => {
    let userId = await fetch(host + "getid", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        token: localStorage["token"],
        "content-type": "application/json",
      },
    });
    userId = await userId.json();
    console.log(userId);
    try {
      let response = await fetch(host + "userinfo/" + userId, {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          token: localStorage["token"],
          "content-type": "application/json",
        },
      });

      let data = await response.json();
      setUser(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleSubmit = async (values) => {
  //   try {
  //     const res = await firebase
  //       .auth()
  //       .signInWithEmailAndPassword(values.email, values.password.toString());
  //     if (res) {
  //       userDocRef
  //         .where("email", "==", values.email)
  //         .get()
  //         .then((querySnapshot) => {
  //           console.log(querySnapshot[0]);
  //           querySnapshot.forEach((doc) => {
  //             const userData = doc.data();
  //             dispatch(login(userData));
  //             history.push("/About");
  //           });
  //         })
  //         .catch((error) => {
  //           console.log("Error getting document: ", error);
  //         });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onLogin = async (dataForm) => {
    try {
      let response = await fetch(host + "login", {
        method: "POST",
        body: JSON.stringify(dataForm),
        headers: {
          "content-type": "application/json",
        },
      });
      let data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        history.push("/hosting");
      } else {
        alert("הפרטים שהזנת אינם תקינים, נסה שוב");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loginPageContainer">
      <h1 className="headerSection">Welcome</h1>

      <div className="loginInputsSection">
        <Formik
          className="registerInputsForm"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          {(props) => {
            return (
              <Form>
                <Field
                  as={TextField}
                  label="Email"
                  type="Text"
                  name="email"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  {...register("email", {
                    required: true,
                    minLength: 6,
                    maxLength: 50,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                {errors.email && (
                  <div style={{ color: "red" }}>
                    נא להקליד אימייל תקין בין 6 ל50 תווים
                  </div>
                )}
                <Field
                  as={TextField}
                  label="Password"
                  type="Password"
                  name="password"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 30,
                  })}
                />
                {errors.password && (
                  <div style={{ color: "red" }}>
                    נא להקליד סיסמה תקינה בין 6 ל30 תווים
                  </div>
                )}

                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
      {/* {props.changeStateButton} */}
    </div>
  );
};

export default Login;
