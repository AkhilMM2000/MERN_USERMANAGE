import { createSlice } from "@reduxjs/toolkit";

const Useradmin=createSlice({
    name:"Admin",
    initialState:{
      usermanage:[]
    },
    reducers:{
     allusers:(state,action)=>{

     }  
        
    }
})
export const {allusers} =Useradmin.actions
export default Useradmin.reducer