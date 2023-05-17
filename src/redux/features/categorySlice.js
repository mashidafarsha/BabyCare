import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  department:null
    
   
   
  
}
const categorySlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        setCategoryDetails: (state, action) => {
            state.department = action.payload.department
           
        },
       
    }
})

export const { setCategoryDetails } = categorySlice.actions;

export default categorySlice.reducer;