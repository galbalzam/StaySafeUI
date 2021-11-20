import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
  street: '',
  house: '',
  isAuthenticated: false,
  isAdmin: false,
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login: (state, action) => {
      const userData = action.payload;
      state.email = userData.email
      state.firstName = userData.firstName
      state.lastName = userData.lastName
      state.phone = userData.phone
      state.city = userData.city
      state.street = userData.street
      state.isAuthenticated = true
      state.isAdmin = userData.isAdmin
    },
    logout: (state) => {
      state.email = ''
      state.firstName = ''
      state.lastName = ''
      state.phone = ''
      state.city = ''
      state.street = ''
      state.isAuthenticated = false;
      state.isAdmin = false;
    },

  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer