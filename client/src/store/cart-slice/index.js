import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
const initialState={
    cartItems:[],
    isLoading:false,
    

}


export  const addToCart=createAsyncThunk('cart/addToCart',async({userId,productId,quantity})=>{
   const response = await axios.post('http://localhost:5000/api/shop/cart/add',{
    userId,productId,quantity,
   })
   return response.data;
})


export  const fetchCartItem=createAsyncThunk('cart/fetchCartItem',async(userId)=>{
   const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`)
   return response.data;
})

export  const DeleteCartItem=createAsyncThunk('cart/DeleteCartItem',async({userId,productId})=>{
   const response = await axios.delete(`http://localhost:5000/api/shop/cart/delete-cart/${userId}/${productId}`)
   return response.data;
})

export  const updateCartItem=createAsyncThunk('cart/updateCartItem',async({userId,productId,quantity})=>{
   const response = await axios.put(`http://localhost:5000/api/shop/cart/update-cart/`,{
    userId,productId,quantity,
   })
   return response.data;
})



const shopCartSlice=createSlice({
    name:'shoppingCart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
     
        (builder).addCase(addToCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addToCart.fulfilled,(state,action)=>{
            console.log(action.payload,"data from the cart-Slice");
            state.isLoading=false;
            state.cartItems=action.payload.data
        }).addCase(addToCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.cartItems=[];
        }).addCase(fetchCartItem.pending,(state)=>{
            state.isLoading=true;
        }).addCase(fetchCartItem.fulfilled,(state,action)=>{
            console.log(action.payload,"data from the cart-Slice");
            state.isLoading=false;
            state.cartItems=action.payload.data
        }).addCase(fetchCartItem.rejected,(state,action)=>{
            state.isLoading=false;
            state.cartItems=[];
        }).addCase(updateCartItem.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateCartItem.fulfilled,(state,action)=>{
            console.log(action.payload,"data from the cart-Slice");
            state.isLoading=false;
            state.cartItems=action.payload.data
        }).addCase(updateCartItem.rejected,(state,action)=>{
            state.isLoading=false;
            state.cartItems=[];
        }).addCase(DeleteCartItem.pending,(state)=>{
            state.isLoading=true;
        }).addCase(DeleteCartItem.fulfilled,(state,action)=>{
            console.log(action.payload,"data from the cart-Slice");
            state.isLoading=false;
            state.cartItems=action.payload.data
        }).addCase(DeleteCartItem.rejected,(state,action)=>{
            state.isLoading=false;
            state.cartItems=[];
        })
        

         
    }
})

export default shopCartSlice.reducer