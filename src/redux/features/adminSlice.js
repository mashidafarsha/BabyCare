import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    admin:null
    
  };
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminDetails: (state, action) => {
            state.admin = action.payload.admin
        },
       
    }
})

export const { setAdminDetails } = adminSlice.actions;

export default adminSlice.reducer;