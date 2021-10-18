import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../authReducer'

export const store = configureStore({
  reducer: {
      userData: userSlice
  },
})