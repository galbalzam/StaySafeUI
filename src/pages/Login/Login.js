import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth.reducer";
import  { Formik, Field, Form, ErrorMessage } from 'formik'
import {loginValidationSchema} from '../../Validation/AuthInputValidation'
import {firebase} from "../../FireBase/initFireBase";
import "firebase/auth";
import { useHistory } from "react-router";

const initialValues = {
  email: '',
  password: '23'
}

const Login = (props) => {
  const dispatch = useDispatch();
  const userDocRef = firebase.firestore().collection('users')
  const history = useHistory();
  const handleSubmit = async(values) =>{
    try{
      const res = await firebase.auth().signInWithEmailAndPassword(values.email, values.password.toString())
      if(res){
        userDocRef.where("email", "==", values.email).get().then((querySnapshot) => {
          console.log(querySnapshot[0])
          querySnapshot.forEach(doc => {
            const userData = doc.data();
            dispatch(login(userData))
            history.push("/About")
          })
      })
      .catch((error) => {
          console.log("Error getting document: ", error);
      });
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="loginPageContainer">
      <h1 className="headerSection">Welcome</h1>

      <div className="loginInputsSection">
      <Formik className="registerInputsForm"
          
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
          >
            {(props) => {
              return(
              <Form>
               <Field
               as={TextField}
               label="Email"
               type="Email"
               name="email"
               fullWidth
               variant="outlined"
               margin="dense"
               helperText={<ErrorMessage name="email" />}
               error={props.errors.email && props.touched.email}
             />
                   <Field
               as={TextField}
               label="Password"
               type="Password"
               name="password"
               fullWidth
               variant="outlined"
               margin="dense"
               helperText={<ErrorMessage name="password" />}
               error={props.errors.passowrd && props.touched.password}
             />
        <Button variant="contained" 
           type="submit"
           color="primary"
           isLoading={props.isLoading}
           fullWidth >
          Login
        </Button>
             </Form>
              )
            }}
          </Formik>
      </div>
      {props.changeStateButton}
    </div>
  );
};

export default Login;
