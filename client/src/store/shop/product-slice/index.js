import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
    isLoading:false,
      productList:[]
}

export const fetchAllFilteredProduct=createAsyncThunk('/shopproduct/fetchAllProduct',async ({filterParams, sortParams})=>{
  
    const query=new URLSearchParams({
        ...filterParams,
        sortBy:sortParams

    })
    console.log(query.toString(),"query")
    const result=await axios.get(`http://localhost:5000/api/shop/products/get?${query}`)
   
    return result.data
})

export const getProductDetails=createAsyncThunk('/adminproduct/getProductDetails',async (id)=>{
    const result=await axios.get(`http://localhost:5000/api/shop/products/get/${id}`)
        console.log(result.data,"result")
    return result.data
})

const shopProductSlice=createSlice({
    name:'shoppingProducts',
    initialState,
    reducers:{
        setProductDetails:(state=>{
            state.productDetails=null
        })
    },
    extraReducers:(builder)=>{
             builder.addCase(fetchAllFilteredProduct.pending,(state,action)=>{
                state.isLoading=true;
             }).addCase(fetchAllFilteredProduct.fulfilled,(state,action)=>{

                state.isLoading=false,
                state.productList=action.payload.data
             }).addCase(fetchAllFilteredProduct.rejected,(state,action)=>{
                state.isLoading=false,
                state.productList=[]
             })
 builder.addCase(getProductDetails.pending,(state)=>{
        state.isLoading=true
      }).addCase(getProductDetails.fulfilled,(state,action)=>{
        console.log(action.payload,"getting data from the admin authslice for the product details");
        state.isLoading=false,
        state.productDetails=action.payload.data


      }).addCase(getProductDetails.rejected,(state,action)=>{
        state.isLoading=false;
        state.productDetails=null
      })

             
    }
})

export const {setProductDetails}=shopProductSlice.actions
export default shopProductSlice.reducer