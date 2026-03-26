import { Dialog,DialogContent } from "../ui/dialog"
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar,AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { setProductDetails } from "@/store/shop/product-slice";
import { useDispatch } from "react-redux";

function ProductDetailsDialog({open,setOpen,productDetails,handleAddtoCart}){
  const dispatch=useDispatch()
  function handleDialogClose(){
    setOpen(false);
    dispatch(setProductDetails())
  }

  if (!productDetails) return null; 
    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
<DialogContent className="w-full !max-w-[900px] !max-h-[900vh] overflow-auto p-6 grid grid-cols-2 gap-8">
      <div className="relative overflow-hidden rounded-lg">
        <img src={productDetails.image} alt={productDetails.title} width={600} height={600} className="aspect-square w-full object-cover" />
      </div>
      <div className=" gap-6 ">
        <div >
            <h1 className="text-3xl font-extrabold m-3">{productDetails.title}</h1>
            <p className="text-muted-foreground text-xl m-3">{productDetails.description}</p>
        </div>
        <div className="flex items-center justify-between">
        <p className={`text-2xl font-bold text-primary ${productDetails.salePrice>0?"line-through":""}`}>${productDetails.price}</p>
        {
          productDetails.salePrice>0?<p className="text-2xl font-bold text-muted-foreground">${productDetails.salePrice}</p>:""
        }
        </div>

           <div className="flex items-center gap-0.5 mt-2">
                  <StarIcon className="w-5 h-5 fill-primary"/>
                <StarIcon className="w-5 h-5 fill-primary"/>
                <StarIcon className="w-5 h-5 fill-primary"/>
                <StarIcon className="w-5 h-5 fill-primary"/>
                <StarIcon className="w-5 h-5 fill-primary"/>
                             <span>(4.5)</span>
                </div>
   
              
                
        <div className="mt-5 mb-5">
        <Button onClick={()=>{handleAddtoCart(productDetails._id); setOpen(false)}} className="w-full" >Add to Cart</Button>
        </div>
        <Separator />
        <div className="max-h-[300px] overflow-auto">
          <h2 className="text-xl font-bold mb-4">
            Reviews
          </h2>
          <div className="grid gap-6">
            <div className="flex gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarFallback >
                AS
              </AvatarFallback>
                </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">Arpit Singh</h3>
                </div>
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary"/>
                <StarIcon className="w-5 h-5 fill-primary"/>
                <StarIcon className="w-5 h-5 fill-primary"/>
                <StarIcon className="w-5 h-5 fill-primary"/>
                <StarIcon className="w-5 h-5 fill-primary"/>
                </div>
                <p className="text-muted-foreground">This is a awesome Product</p>
              </div>
          
            </div>
          </div>
        <div className="mt-6 flex gap-2">
          <Input placeholder="Write a review..."/>
          <Button>Submit</Button>

        </div>
        </div>
      </div>
</DialogContent>

        </Dialog>
    )
}
export default ProductDetailsDialog


