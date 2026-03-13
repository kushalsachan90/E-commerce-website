 import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/ui/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminProduct from "./pages/admin-view/product";
import ShopLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found/notfound";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import CheckAuth from "./components/common/checkauth";
import UnauthPage from "./pages/unauthpage";
import Accountpage from "./pages/shopping-view/Accountpage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {checkAuth} from "../src/store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton"

function App() {
 const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth)
 const dispatch=useDispatch();
 useEffect(()=>{
  dispatch(checkAuth())
 },[dispatch])
 
 if(isLoading) return <Skeleton className="h-[600px] w-[600px] rounded-full " />

 console.log(isLoading,user)
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
     } >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="Order" element={<AdminFeatures />} />
          <Route path="product" element={<AdminProduct />} />
        </Route>
        <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShopLayout/></CheckAuth>} >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
           <Route path="account" element={<Accountpage />} />
        </Route>
         
         <Route path="/unauth-page" element={<UnauthPage/>}/>
         <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
