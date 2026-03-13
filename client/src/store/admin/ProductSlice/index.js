import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
    isLoading:false,
    productList:[],
    productDetails:null
}

export const addNewProduct=createAsyncThunk('/adminproduct/addnewProduct',async (formData)=>{
    const result=await axios.post('http://localhost:5000/api/admin/products/add',formData ,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    return result.data
})


export const fetchAllProduct=createAsyncThunk('/adminproduct/fetchAllProduct',async ()=>{
    const result=await axios.get('http://localhost:5000/api/admin/products/get')
    return result.data
})

// export const getProductDetails=createAsyncThunk('/adminproduct/getProductDetails',async (id)=>{
//     const result=await axios.get(`http://localhost:5000/api/shop/products/get/${id}`)
//         console.log(result.data,"result")
//     return result.data
// })



export const editProduct=createAsyncThunk('/adminproduct/editProduct',async ({id,...formData})=>{
    const result=await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`,formData ,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    return result.data
})

export const deleteProduct=createAsyncThunk('/adminproduct/deleteProduct',async (id)=>{
    const result=await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`)

    return result.data
})






const AdminProductSlice=createSlice({
    name:'adminProducts',
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
      builder.addCase(fetchAllProduct.pending,(state)=>{
        state.isLoading=true
      }).addCase(fetchAllProduct.fulfilled,(state,action)=>{
        console.log(action.payload,"getting data from the admin authslice");
        state.isLoading=false,
        state.productList=action.payload.data

      }).addCase(fetchAllProduct.rejected,(state,action)=>{
        state.isLoading=false;
        state.productList=[]
      })
       

    //    builder.addCase(getProductDetails.pending,(state)=>{
    //     state.isLoading=true
    //   }).addCase(getProductDetails.fulfilled,(state,action)=>{
    //     console.log(action.payload,"getting data from the admin authslice for the product details");
    //     state.isLoading=false,
    //     state.productDetails=action.payload.data


    //   }).addCase(getProductDetails.rejected,(state,action)=>{
    //     state.isLoading=false;
    //     state.productDetails=null
    //   })


    }
})


export default AdminProductSlice.reducer