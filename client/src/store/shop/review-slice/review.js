import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import axios from "axios";
const initialState={
    isLoading:false,
    ReviewList:[]
}

// export const addProductReview= createAsyncThunk('/addProduct/reviewSlice',async({productId,userId,userName,reviewMessage,reviewValue})=>{
//     const response=await axios.post('http://localhost:5000/api/shop/review/add',{productId,userId,userName,reviewMessage,reviewValue});
//     return response.data
// })
export const addProductReview = createAsyncThunk('/addProduct/reviewSlice', 
    async({ productId, userId, userName, reviewMessage, reviewValue }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/shop/review/add', 
                { productId, userId, userName, reviewMessage, reviewValue });
            return response.data  // ✅ success case → goes to payload
        } catch(error) {
            return rejectWithValue(error.response.data)  // ✅ error case → also goes to payload
        }
    }
)

export const getProductReview= createAsyncThunk('/getProduct/reviewSlice',async(id)=>{
    const response=await axios.get(`http://localhost:5000/api/shop/review/get/${id}`);
    return response.data
})

const reviewSlice=createSlice({
    name:"reviewSlice",
    initialState,
    reducers:{
         resetReviews: (state) => {  // ✅ add this
            state.ReviewList = []
        }
    },
    extraReducers:(builder)=>{
       
       builder.addCase(getProductReview.pending,(state)=>{
        state.isLoading=true
       }).addCase(getProductReview.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.ReviewList=action.payload.data
       }).addCase(getProductReview.rejected,(state,action)=>{
        state.isLoading=false,
        state.ReviewList=[]
       })
    }
})
export const { resetReviews } = reviewSlice.actions 
export default reviewSlice.reducer