import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
    loading:false,
    error:false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading =true
           
         
        },
        loginSuccess: (state, action) => {
            state.currentUser=action.payload ;
            
        },
        loginFailure: (state, action) => {
            state.error= action.payload;
            state.loading=false
            
            
        },

        logOut:(state, action)=>{
            state.currentUser = false;
            state.loading = false;
            state.error = false;
        },
        deleteUser:(state, action)=>{
            state.currentUser = false;
            state.loading = false;
            state.error = false;

        }
    },
})

export const { loginStart,loginSuccess, loginFailure,logOut,deleteUser } = userSlice.actions

export default userSlice.reducer