import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    approvalUrl:null,
    isLoading:false,
    orderId:null,
    orderList:[],
    orderDetails:null
}

export const createNewOrder=createAsyncThunk('/shoppingOrderSlice/createOrder',async(orderData)=>{
    const response=await axios.post('http://localhost:5000/api/shop/order/create',orderData)
    return response.data
})


export const captureOrder=createAsyncThunk('/shoppingOrderSlice/captureOrder',async({paymentId,payerId,orderId})=>{
    const response=await axios.post('http://localhost:5000/api/shop/order/capture',{
        payerId:payerId,
        paymentId:paymentId,
        orderId:orderId
    })
    return response.data
})



export const getAllOrdersByUser=createAsyncThunk('/shoppingOrderSlice/getAllOrdersByUser',async(userId)=>{
    const response=await axios.get(`http://localhost:5000/api/shop/order/OrderByUser/${userId}`,)
    return response.data
})


export const getAllOrdersDetails=createAsyncThunk('/shoppingOrderSlice/getAllOrdersDetails',async(id)=>{
    const response=await axios.get(`http://localhost:5000/api/shop/order/getOrderDetails/${id}`,)
    return response.data
})

const shoppingOrderSlice=createSlice({
    name:'shoppingOrderSlice',
    initialState,
    reducers:{
      resetOrderDetails:(state)=>{
         state.orderDetails=null;
      }
    },
    extraReducers:(builder)=>{
     builder.addCase(createNewOrder.pending,(state)=>{
        state.isLoading=true
     }).addCase(createNewOrder.fulfilled,(state,action)=>{
       
        state.isLoading=false,
        state.approvalUrl=action.payload.approvalUrl,
        state.orderId=action.payload.orderId
        sessionStorage.setItem('currentOrderId',JSON.stringify(action.payload.orderId))

     }).addCase(createNewOrder.rejected,(state,action)=>{
        state.isLoading=false,
        state.approvalUrl=null
        state.orderId=null
     }).addCase(getAllOrdersByUser.pending,(state)=>{
        state.isLoading=true
     }).addCase(getAllOrdersByUser.fulfilled,(state,action)=>{
        console.log(action.payload,"all order find")
        state.isLoading=false,
   state.orderList=action.payload.message
       

     }).addCase(getAllOrdersByUser.rejected,(state,action)=>{
        state.isLoading=false,
        state.orderList=[]
     }).addCase(getAllOrdersDetails.pending,(state)=>{
        state.isLoading=true
     }).addCase(getAllOrdersDetails.fulfilled,(state,action)=>{
       console.log(action.payload,"orderDetails from orders")
        state.isLoading=false,
  state.orderDetails=action.payload.message
        

     }).addCase(getAllOrdersDetails.rejected,(state,action)=>{
        state.isLoading=false,
        state.orderDetails=null
     })  
    }
})
export const {resetOrderDetails}=shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer