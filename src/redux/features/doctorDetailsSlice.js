import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorData:null
  
};
const doctorDetailsSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorData: (state, action) => {
      state.doctorData = action.payload.doctorData
     
    },
  },
});

export const { setDoctorData } = doctorDetailsSlice.actions;

export default doctorDetailsSlice.reducer;