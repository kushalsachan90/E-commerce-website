import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    approvalUrl:null,
    isLoading:false,
    orderId:null
}

export const createNewOrder=createAsyncThunk('/shoppingOrderSlice/createOrder',async(orderData)=>{
    const response=await axios.post('http://localhost:5000/api/shop/order/create',orderData)
    return response.data
})

const shoppingOrderSlice=createSlice({
    name:'shoppingOrderSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(createNewOrder.pending,(state)=>{
        state.isLoading=true
     }).addCase(createNewOrder.fulfilled,(state,action)=>{
       
        state.isLoading=false,
        state.approvalUrl=action.payload.approvalUrl,
        state.orderId=action.payload.orderId

     }).addCase(createNewOrder.rejected,(state,action)=>{
        state.isLoading=false,
        state.approvalUrl=null
        state.orderId=null
     })
    }
})
export default shoppingOrderSlice.reducer