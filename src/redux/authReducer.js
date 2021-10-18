import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  firstName:'',
  lastName: '',
  phone: '',
  city: '',
  street: '',
  house: '',
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login: (state , action) => {
      const userData = action.payload;
      state.email = userData.email
      state.firstName = userData.firstName
      state.lastName = userData.lastName
      state.phone = userData.phone
      state.city = userData.city
      state.street = userData.street
      state.house = userData.house
      state.isAuthenticated = true
    },
    tempLogin: (state) => {
      state.isAuthenticated=true;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { login,tempLogin } = userSlice.actions

export default userSlice.reducer