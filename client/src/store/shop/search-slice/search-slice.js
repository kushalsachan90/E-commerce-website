import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"
const initialState={
    isLoading:false,
    searchResult:[]
}

export const getSearchResult= createAsyncThunk('/getSearchResult/searchSlice',async(keyword)=>{
    const response=await axios.get(`http://localhost:5000/api/shop/search/${keyword}`)

    return response.data;
})


const searchSlice= createSlice({
    name:'searchSlice',
    initialState,
    reducers:{
        resetStateResult:(state)=>{
            state.searchResult=[];
        }
    },
    extraReducers:(builder)=>{
      builder.addCase(getSearchResult.pending,(state)=>{
        state.isLoading=true
      }).addCase(getSearchResult.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.searchResult=action.payload.message
      }).addCase(getSearchResult.rejected,(state,action)=>{
        state.isLoading=false,
        state.searchResult=[]
      })
    }
})

export const {resetStateResult}=searchSlice.actions

export default searchSlice.reducer;