import { configureStore } from '@reduxjs/toolkit'
import adminSlice from '../features/adminSlice'
import doctorSlice from '../features/doctorSlice'



export default configureStore({
  reducer: {
   admin:adminSlice,
    doctor:doctorSlice,
    
  }
})