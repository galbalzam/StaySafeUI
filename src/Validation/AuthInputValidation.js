import * as yup from 'yup';

export const loginValidationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });
  
  export const registerValidationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
      firstName: yup.string('Enter your first name').required('first name is required'),
      lastName: yup.string('Enter your last name').required('last name is required'),
      phone: yup.string('Enter your phone number').max(10, "phone number must be less then 10 digits").required('phone is required'),
      city: yup.string('Enter your city').required('city is required'),
      street: yup.string('Enter your street').required('street is required'),
  });