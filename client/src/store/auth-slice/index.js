import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
    isAuthenticated:false,
    isLoading:true,
    user:null,

}

export const registerUser=createAsyncThunk('auth/register',async(formData)=>{
    const response=await axios.post('http://localhost:5000/api/auth/register',formData,{
        withCredentials:true
    })
    return response.data
})


export const LoginUser=createAsyncThunk('auth/login',async(formData)=>{
    const response=await axios.post('http://localhost:5000/api/auth/login',formData,{
        withCredentials:true
    })
    return response.data
})

export const checkAuth=createAsyncThunk('auth/checkAuth',async()=>{
    const response=await axios.get('http://localhost:5000/api/auth/check-auth',{
        withCredentials:true,
        headers:{
            'Cache-Control':'no-store, no-cache,must-revalidate,proxy-revalidate'
        }
    })
    return response.data
})

export const logOutUser=createAsyncThunk('auth/logOutUser',async()=>{
    const response=await axios.post('http://localhost:5000/api/auth/logOut',{},{
        withCredentials:true
    })
    return response.data;
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state,action) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })

            // Login
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false; 
                console.log(action,"data from the auth-slice");
                state.user = (action.payload.success) ? action.payload.user : null;
                state.isAuthenticated = action.payload.success ? true : false;
            })
            .addCase(LoginUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })

            // Check Auth
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false; 
                console.log(action,"data from the auth-slice");
                state.user = (action.payload.success) ? action.payload.user : null;
                state.isAuthenticated = action.payload.success ? true : false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            //logout
            .addCase(logOutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logOutUser.fulfilled, (state, action) => {
                state.isLoading = false;
    state.user = null;              // direct null
    state.isAuthenticated = false;
            })
            .addCase(logOutUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
    }
});



;


export const {setUser} = authSlice.actions
export default authSlice.reducer