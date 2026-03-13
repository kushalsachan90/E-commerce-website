import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductReducer from './admin/ProductSlice'
import shopProductSliceReducer  from './shop/product-slice'
import shopCartSliceReducer from './cart-slice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts:adminProductReducer,
        shopProducts:shopProductSliceReducer,
        cartProduct:shopCartSliceReducer,
    }
});

export default store;
