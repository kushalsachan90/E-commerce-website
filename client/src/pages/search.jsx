import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getSearchResult, resetStateResult } from "@/store/shop/search-slice/search-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { toast } from "sonner";
import { fetchCartItem } from "@/store/cart-slice";
import { addToCart } from "@/store/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getProductDetails } from "@/store/shop/product-slice";
function SearchProducts(){
const [keyword,setKeyword]=useState('');
const[searchParams,setSearchParams]=useSearchParams()

const {cartItems}=useSelector(state=>state.cartProduct);

const {user}=useSelector(state=>state.auth)
const [openDetailsDialog,setOpenDetailsDialog]=useState(false);
const {searchResult}=useSelector(state=>state.searchProducts)
 const {productDetails}=useSelector(state=>state.shopProducts)
console.log(searchResult,"search")
const dispatch=useDispatch()
useEffect(()=>{
    if(keyword&&keyword.trim()!==''&&keyword.trim().length>3){ 
         setTimeout(()=>{                                                  //! why use settime reason Why?  
                                                                             //!  👉 To avoid calling API on every keystroke
                                                                            //!👉 This is called debouncing (basic version)
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(getSearchResult(keyword))
         },1000)
    }else{
              setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
        dispatch(resetStateResult())
    }
},[keyword])


function handleProductDetails(getCurrrentProductid){
    console.log(getCurrrentProductid,'productid')
    dispatch(getProductDetails(getCurrrentProductid)).then((data)=>console.log(data,"data"))

}

 function handleAddtoCart(getProductid,gettotalStock){
    console.log(getProductid,"getProductId")

    let getCartItems =cartItems.items||[];
  
    if(getCartItems.length){
          const indexOfCurrentItem=getCartItems.findIndex(item=>item.productId===getProductid);
          console.log(indexOfCurrentItem,"indexOfCurrentItem")
          if(indexOfCurrentItem>-1){
const getQuantity=getCartItems[indexOfCurrentItem].quantity
if(getQuantity+1>gettotalStock){
    toast(`Only ${getQuantity} quantity can be added for this item`)
    return;
}
          }
          
    }
    dispatch(addToCart({userId:user.id,productId:getProductid,quantity:1})).then((data)=>{
        if(data.payload.success){
            dispatch(fetchCartItem(user.id));
            toast("product added successfully")
        }
    })
 }

 useEffect(()=>{
  if(productDetails!==null){
    setOpenDetailsDialog(true);
  }  
},[productDetails])


    return <div className="container mx-auto md:px-6 px-4 py-8">
        <div className="flex justify-center mb-8">
            <div className="w-full flex items-center">
                <Input value={keyword} name="keyword" onChange={(event)=>setKeyword(event.target.value)} placeholder="Search Products"/>  
            </div>
        </div>
        {
            !searchResult.length?<h1 className="text-5xl font-extrabold ">No result found!..</h1>:null
        }
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
           {
           searchResult.map( item=> <ShoppingProductTile product={item} handleAddtoCart={handleAddtoCart} handleProductDetails={handleProductDetails}/>)
           }
        </div>
         <ProductDetailsDialog handleAddtoCart={handleAddtoCart} open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
}
export default SearchProducts