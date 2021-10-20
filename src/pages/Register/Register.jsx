import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { register } from "../../Services/auth.service";
import  { Formik, Field, Form, ErrorMessage } from 'formik'
import "./Register.css";
import {firebase} from "../../FireBase/initFireBase";
import "firebase/auth";
import { toast } from 'react-toastify';
import {registerValidationSchema} from '../../Validation/AuthInputValidation'
import {login} from '../../redux/auth.reducer'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
const initialValues = {
  email: '',
  password: '',
  lastName: '',
  firstName:'',
  phone:'',
  city:'',
  street:'',
}
const Register = (props) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const notify = (message) => toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

  const ref = firebase.firestore().collection('users');

  const handleSubmit = async(values) =>{
    const userData = values;
    try{
      await firebase.auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(res => console.log(res));
      delete userData["password"]
      await ref.add({
        ...userData
      }).then(res => console.log(res));
      dispatch(login(userData))
      history.push("/About")
    }catch(err){
      console.log(err)
      notify(err.message)
    }
  }

  return (
      <div className="registerPageContainer">
        <h1 className="headerSection">Register</h1>

        <div className="registerInputsSection">
          <Formik className="registerInputsForm"
          
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
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
               error={props.errors.password && props.touched.password}
             />
              <Field
               as={TextField}
               label="First Name"
               name="firstName"
               fullWidth
               variant="outlined"
               margin="dense"
               helperText={<ErrorMessage name="firstName" />}
               error={props.errors.firstName && props.touched.firstName}
             />
              <Field
               as={TextField}
               label="Last Name"
               name="lastName"
               fullWidth
               variant="outlined"
               margin="dense"
               helperText={<ErrorMessage name="lastName" />}
               error={props.errors.lastName && props.touched.lastName}
             />
              <Field
               as={TextField}
               label="Phone Number"
               name="phone"
               fullWidth
               variant="outlined"
               margin="dense"
               helperText={<ErrorMessage name="phone" />}
               error={props.errors.phone && props.touched.phone}
             />
<Field
               as={TextField}
               label="City"
               name="city"
               fullWidth
               variant="outlined"
               margin="dense"
               helperText={<ErrorMessage name="city" />}
               error={props.errors.city && props.touched.city}
             />
             <Field
               as={TextField}
               label="Street"
               name="street"
               fullWidth
               variant="outlined"
               margin="dense"
               helperText={<ErrorMessage name="street" />}
               error={props.errors.street && props.touched.street}
             />
        <Button variant="contained" 
           type="submit"
           color="primary"
           fullWidth >
          Register
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

export default Register;
