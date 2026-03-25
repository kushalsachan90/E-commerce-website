import { BabyIcon, ChevronLeftIcon ,ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon,Footprints,Shirt,Slack,Target,Split} from "lucide-react";
import bannerone from "../../assets/banner-1.webp"
import bannertwo from "../../assets/banner-2.webp"
import bannerthree from "../../assets/banner-3.webp"
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { fetchAllFilteredProduct } from "@/store/shop/product-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { getProductDetails } from "@/store/shop/product-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { fetchCartItem } from "@/store/cart-slice";
import { addToCart } from "@/store/cart-slice";
import { toast } from "sonner";
function ShoppingHome(){
 const [openDetailsDialog,setOpenDetailsDialog]=useState(false)
  const {productDetails}=useSelector(state=>state.shopProducts)

function handleProductDetails(getCurrrentProductid){
    console.log(getCurrrentProductid,'productid')
    dispatch(getProductDetails(getCurrrentProductid)).then((data)=>console.log(data,"data"))

}
const { user } = useSelector(state => state.auth)
function handleAddtoCart(getProductid){
    console.log(getProductid,"getProductId")
    dispatch(addToCart({userId:user.id,productId:getProductid,quantity:1})).then((data)=>{
        console.log(data,'data of addtocart')
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

  const [currentSlide ,setcurrentSlide]=useState(0);
  const navigate=useNavigate();

  function handleNavigatetoListing(getcurrentItem,section){
    sessionStorage.removeItem('filters');
    const currentFilter={
        [section]:[getcurrentItem.id]
    }
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

    const slides=[bannerone,bannertwo,bannerthree];
 
    useEffect(()=>{
    
        const timer=setInterval(()=>{
            setcurrentSlide(prevslide=>(prevslide+1)%slides.length)
        },5000)
        return ()=>clearInterval(timer);
    },[])

    const categorieswithIcon=[
            {id:"men",label:"Men",icon:ShirtIcon},
            {id:"women",label:"women",icon:CloudLightning},
            {id:"kids",label:"kids",icon:BabyIcon},
            {id:"accessories",label:"Accessories",icon:WatchIcon},
            {id:"footwear",label:"Footwear",icon:UmbrellaIcon}
        ]

       const  brandwithIcon=[
            {id:"nike",label:"Nike",icon:Footprints },
            {id:"adidas",label:"Adidas",icon:Shirt },
            {id:"puma",label:"Puma",icon:Slack },
            {id:"levi",label:"Levi's",icon:Target},
            {id:"zara",label:"Zara",icon:Split}
        ]

               const dispatch=useDispatch();
               const {productList}=useSelector(state=>state.shopProducts)
           useEffect(()=>{
            dispatch(fetchAllFilteredProduct({filterParams:{}, sortParams:'price-low-high'}))
           },[dispatch])
          console.log(productList,'productList')


    return <div className="flex flex-col min-h-screen">
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[600px] overflow-hidden">
            {
slides.map((slide,index)=>(
   <img
     src={slide}
     key={index}
     className={`${index===currentSlide?'opacity-100 z-10 ':'opacity-0 z-0'}absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out will-change-[opacity]`}
   />
))
            }
            <Button variant="outline" size="icon" className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 bg-white/80" onClick={()=>setcurrentSlide(prevSlide=>(prevSlide-1+slides.length)%slides.length)}>

                <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="absolute top-1/2 z-20 right-4 transform -translate-y-1/2 bg-white/80" onClick={()=>setcurrentSlide(prevSlide=>(prevSlide+1)%slides.length)}>

                <ChevronRightIcon className="w-4 h-4" />
            </Button>
        </div>
        <section className="py-12  bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Shop By Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {
                        categorieswithIcon.map(item=><Card  onClick={()=>handleNavigatetoListing(item,'category')} className="cursor-pointer hover:shadow-lg transition-shadow">
                            <CardContent className=" flex flex-col items-center justify-center p-6">
                     <item.icon className="w-12 h-12 text-primary" />
                     <span>{item.label}</span>
                            </CardContent>
                        </Card>)
                        
                    }
                </div>
            </div>
        </section>
          <section className="py-12  bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Shop By Brand</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {
                        brandwithIcon.map(item=><Card   className="cursor-pointer hover:shadow-lg transition-shadow">
                            <CardContent className=" flex flex-col items-center justify-center p-6">
                     <item.icon className="w-12 h-12 text-primary" />
                     <span>{item.label}</span>
                            </CardContent>
                        </Card>)
                        
                    }
                </div>
            </div>
        </section>
        <section className="py-12">
 <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
                <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {
                        productList&&productList.length>0?productList.map(productItem=><ShoppingProductTile  handleAddtoCart={handleAddtoCart} handleProductDetails={handleProductDetails}product={productItem}/>):null
                    }
                </div>
                </div>
        </section>
         <ProductDetailsDialog handleAddtoCart={handleAddtoCart} open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
}
export default ShoppingHome;