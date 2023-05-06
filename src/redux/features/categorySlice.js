import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   
    id:"",
    categoryName:"",
    description:"",
    
   
   
  
}
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategoryDetails: (state, action) => {
            state.id=action.payload.id;
            state.categoryName = action.payload.categoryName;
            state.description = action.payload.description;
           
        },
       
    }
})

export const { setCategoryDetails } = categorySlice.actions;

export default categorySlice.reducer;