import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductReducer from './admin/ProductSlice'
import shopProductSliceReducer  from './shop/product-slice'
import shopCartSliceReducer from './cart-slice'
 import shopAddressSlice from './shop/addressSlice'
 import shopOrderSlice from './order-slice/index'
 import adminOrderslice from './admin/orderSlice/index'
 import searchSlice from './shop/search-slice/search-slice';
 import reviewSlice from './shop/review-slice/review'
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts:adminProductReducer,
        shopProducts:shopProductSliceReducer,
        cartProduct:shopCartSliceReducer,
        Address:shopAddressSlice,
        Orderdetails:shopOrderSlice,
        adminOrderDetails:adminOrderslice,
        searchProducts:searchSlice,
        reviewProduct:reviewSlice
    }
});

export default store;
