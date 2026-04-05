import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isLoading:false,
    orderList:[],
    orderDetails:null
}
export const getAllOrdersforAdmin=createAsyncThunk('/adminOrderSlice/getAllOrdersforAdmin',async()=>{
    const response=await axios.get(`http://localhost:5000/api/admin/order/get`,)
    return response.data
})

export const getAllOrdersDetailsforAdmin=createAsyncThunk('/adminOrderSlice/getAllOrdersDetailsforAdmin',async(id)=>{
    const response=await axios.get(`http://localhost:5000/api/admin/order/details/${id}`,)
    return response.data
})

export const updateOrderStatus=createAsyncThunk('/adminOrderSlice/getAllOrdersDetailsforAdmin',async({id,orderStatus})=>{
    const response=await axios.put(`http://localhost:5000/api/admin/order/update/${id}`,{orderStatus})
    return response.data
})

const adminOrderSlice=createSlice({
    name:'adminOrderSlice',
    initialState,
    reducers:{
resetOrderDetails:(state,action)=>{
    state.orderDetails=null
}

    },
    extraReducers:(builder)=>{
        builder.addCase(getAllOrdersforAdmin.pending,(state)=>{
            state.isLoading=true
            

        }).addCase(getAllOrdersforAdmin.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.orderList=action.payload.message
        }).addCase(getAllOrdersforAdmin.rejected,(state,action)=>{
            state.isLoading=false,
            state.orderList=[]
        }) .addCase(getAllOrdersDetailsforAdmin.pending,(state)=>{
            state.isLoading=true
            

        }).addCase(getAllOrdersDetailsforAdmin.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.orderDetails=action.payload.message
        }).addCase(getAllOrdersDetailsforAdmin.rejected,(state,action)=>{
            state.isLoading=false,
            state.orderDetails=null
        })

    }
})
export const {resetOrderDetails}=adminOrderSlice.actions

export default adminOrderSlice.reducer