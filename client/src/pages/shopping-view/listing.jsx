import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuRadioGroup,DropdownMenuRadioItem} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/components/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProduct } from "@/store/shop/product-slice";
import { useEffect } from "react";
import { useState } from "react";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import {  useSearchParams } from "react-router-dom";
import { getProductDetails } from "@/store/shop/product-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItem } from "@/store/cart-slice";
import { toast } from "sonner";
function createSearchParamsHelper(filterParams){
    const queryParams=[];
      
    for(const[key,value] of Object.entries(filterParams)){
        if(Array.isArray(value)&&value.length>0){
            const paramValue=value.join(',')
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }
    }
return queryParams.join('&')
}


function ShoppingListing(){

    const [serarchParams,setSearchParams]=useSearchParams();

const dispatch=useDispatch();
 const {productList,productDetails}=useSelector(state=>state.shopProducts)

 const [filters,setfilters]=useState({});
 const [sort ,setsort]=useState(null);
 const [openDetailsDialog,setOpenDetailsDialog]=useState(false)
 console.log(filters,'filter')


const categorySearchParam=serarchParams.get('category')

 function handleSort(value){
console.log(value);
setsort(value)
 }

function handleFilter(getsectionId,getCurrentOption){
console.log(getsectionId)
let cpyFilters={...filters};
const indexOfCurrentSection=Object.keys(cpyFilters).indexOf(getsectionId)
 if(indexOfCurrentSection===-1){
    cpyFilters={
        ...cpyFilters,
        [getsectionId]:[getCurrentOption]
    }
 }
 else{
    const indexOfCurrentSection=cpyFilters[getsectionId].indexOf(getCurrentOption);
    console.log(indexOfCurrentSection,'index')
    if(indexOfCurrentSection===-1){
        cpyFilters[getsectionId].push(getCurrentOption)
    }
    else{
        cpyFilters[getsectionId].splice(indexOfCurrentSection,1)
    }
 }
 console.log(cpyFilters,"cpyfilter")
 setfilters(cpyFilters)
 sessionStorage.setItem('filters',JSON.stringify(cpyFilters))
}

useEffect(()=>{
    setsort("price-low-to-high");
    setfilters(JSON.parse(sessionStorage.getItem("filters")||null))
},[categorySearchParam])


useEffect(()=>{
    if(filters&&Object.keys(filters).length>0){
        const createQueryString=createSearchParamsHelper(filters);
        setSearchParams(new URLSearchParams(createQueryString))
    }
},[filters])
console.log(sort,"sort")
useEffect(()=>{
    if(filters!==null||sort!==null)
    dispatch(fetchAllFilteredProduct({filterParams:filters,sortParams:sort}))
},[dispatch,sort,filters])

function handleProductDetails(getCurrrentProductid){
    console.log(getCurrrentProductid,'productid')
    dispatch(getProductDetails(getCurrrentProductid)).then((data)=>console.log(data,"data"))

}

useEffect(()=>{
  if(productDetails!==null){
    setOpenDetailsDialog(true);
  }  
},[productDetails])

 console.log(productList,'productList')

 const {user}=useSelector(state=>state.auth)


 console.log(user,"userId")
const {cartItems}=useSelector((state)=>state.cartProduct);
console.log(cartItems,"cartItems")


 function handleAddtoCart(getProductid,gettotalStock){
    console.log(getProductid,"getProductId")

    let getCartItems =cartItems.items||[];
    console.log("getProductid:", getProductid)
    console.log("gettotalStock:", gettotalStock)  // 👈 is this undefined?
    console.log("getCartItems:", getCartItems)
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


    return( <div className="flex grid-cols-1 md:grid-cols-[300_1fr] gap-6 p-4 md:p-6  ">
        <ProductFilter filters={filters} handleFilter={handleFilter}/>
        <div className="bg-background w-full rounded-lg shadow-sm">
            <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-extrabold">AllProduct</h2>
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{productList.length } products</span>
                                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowUpDownIcon className="h-4  w-4"/>
                    <span>Sort By</span>
                        </Button>
                    </DropdownMenuTrigger >
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                         {
                            sortOptions.map(sortItem=><DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)
                         }
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
              
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-col gap-4">
                {
                    productList&&productList.length>0? productList.map(productItem=> <ShoppingProductTile handleProductDetails={handleProductDetails} product={productItem} handleAddtoCart={handleAddtoCart}/>):null
                }
            </div>
        </div>
        <ProductDetailsDialog handleAddtoCart={handleAddtoCart} open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
     
    )
}
export default ShoppingListing;