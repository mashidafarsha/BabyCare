import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   
    id:"",
    name:"",
    email:"",
    token:""
   
   
  
}
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminDetails: (state, action) => {
            state.id=action.payload.id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.token = action.payload.token
        },
       
    }
})

export const { setAdminDetails } = adminSlice.actions;

export default adminSlice.reducer;