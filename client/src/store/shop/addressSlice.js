import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    isLoading:false,
    addressList:[]
}
export const addAddress=createAsyncThunk('/addresses/addNewAddress',async(formData)=>{
    const response=await axios.post('http://localhost:5000/api/shop/address/addAddress',formData)
    return response.data
})

export const fetchAllAddress=createAsyncThunk('/addresses/fetchNewAddress',async(userId)=>{
    const response=await axios.get(`http://localhost:5000/api/shop/address/fetchAddress/${userId}`)
    return response.data
})


export const editAddress=createAsyncThunk('/addresses/editNewAddress',async({userId,AddressId,formData})=>{
    const response=await axios.put(`http://localhost:5000/api/shop/address/editAddress/${userId}/${AddressId}`,formData)
    return response.data
})


export const deleteAddress=createAsyncThunk('/addresses/deleteNewAddress',async({userId,AddressId})=>{
    const response=await axios.delete(`http://localhost:5000/api/shop/address/deleteAddress/${userId}/${AddressId}`)
    return response.data
})



const addressSlice=createSlice({
    name:'Address',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
          builder.addCase(addAddress.pending,(state)=>{
            state.isLoading=true
          }).addCase(addAddress.fulfilled,(state,action)=>{
            console.log(action.payload.data,"address data");
            console.log(action.payload,"address payload")
            state.isLoading=false;
       
          }).addCase(addAddress.rejected,(state)=>{
            state.isLoading=false
          
          }).addCase(fetchAllAddress.pending,(state)=>{
            state.isLoading=true
          }).addCase(fetchAllAddress.fulfilled,(state,action)=>{

            state.isLoading=false;
            state.addressList=action.payload.data
          }).addCase(fetchAllAddress.rejected,(state)=>{
            state.isLoading=false,
            state.addressList=[]
          }).addCase(editAddress.pending,(state)=>{
            state.isLoading=true
          }).addCase(editAddress.fulfilled,(state,action)=>{
       
            state.isLoading=false;
            state.addressList=action.payload.data
          }).addCase(editAddress.rejected,(state)=>{
            state.isLoading=false,
            addressList=[]
          }).addCase(deleteAddress.pending,(state)=>{
            state.isLoading=true
          }).addCase(deleteAddress.fulfilled,(state,action)=>{   
            state.isLoading=false;
            state.addressList=action.payload.data
          }).addCase(deleteAddress.rejected,(state)=>{
            state.isLoading=false,
            addressList=[] 
          })
    } 
})

export default addressSlice.reducer