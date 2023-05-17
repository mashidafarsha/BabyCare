import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor:null
  
};
const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorDetails: (state, action) => {
      state.doctor = action.payload.doctor
     
    },
  },
});

export const { setDoctorDetails } = doctorSlice.actions;

export default doctorSlice.reducer;
