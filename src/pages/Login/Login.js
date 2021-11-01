import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth.reducer";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { loginValidationSchema } from '../../Validation/AuthInputValidation'
import "firebase/auth";
import { FireStoreLogin } from '../../Services/auth.service'
import { notifyError } from '../../tostify/toastifyAletrts';
import ForgotPassword from './ForgotPassword'
const initialValues = {
  email: '',
  password: ''
}

const Login = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const startLoader = () => {
    setLoading(true)
  }

  const handleSubmit = async (values) => {
    startLoader()
    FireStoreLogin(values.email, values.password).then(val => dispatch(login(val))).catch(e => {notifyError("You're not in our database, please register fiirst")
    setLoading(false)
  })
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
            return (
              <Form style={{display: 'flex', flexDirection:'column'}}>
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
                <LoadingButton variant="contained"
                  type="submit"
                  color="primary"
                  loading={loading}
                  fullWidth >
                  Login
                </LoadingButton>
                <ForgotPassword/>
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
