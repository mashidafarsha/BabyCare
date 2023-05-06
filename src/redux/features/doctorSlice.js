import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor:null
  // id: "",
  // name: "",
  // email: "",
  // phone: "",
  // qualification: "",
  // department: "",
  // experience: "",
  // consultationFee: "",
  // status: "",
  // token: "",
};
const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorDetails: (state, action) => {
      state.doctor = action.payload.doctor
      // state.id = action.payload.id;
      // state.name = action.payload.name;
      // state.email = action.payload.email;
      // state.image = action.payload.image;
      // state.phone = action.payload.phone;
      // state.qualification = action.payload.qualification;
      // state.department = action.payload.department;
      // state.experience = action.payload.experience;
      // state.slots=action.payload.slots
      // state.consultationFee = action.payload.consultationFee;
      // state.status = action.payload.status;
      // state.token = action.payload.token;
    },
  },
});

export const { setDoctorDetails } = doctorSlice.actions;

export default doctorSlice.reducer;
