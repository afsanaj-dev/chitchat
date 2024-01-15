import { configureStore } from '@reduxjs/toolkit'
// import counterSlice from './Slices/counterSlice'
import  userLoginInfo from './Slices/userSlice'
import userSlice from './Slices/userSlice'

export const store = configureStore({
  reducer: {
    userLoginInfo: userLoginInfo,
  },
})
 