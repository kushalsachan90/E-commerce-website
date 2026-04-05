import { Dialog,DialogContent } from "../ui/dialog"
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar,AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { setProductDetails } from "@/store/shop/product-slice";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/start-rating";
import { useState } from "react";
import { addProductReview,getProductReview } from "@/store/shop/review-slice/review";
import { useEffect } from "react";


import { toast } from "sonner";
function ProductDetailsDialog({open,setOpen,productDetails,handleAddtoCart}){

  const [reviewMSG,setReviewMSG]=useState("");
  const [rating,setrating]=useState(0)
       const {user}=useSelector(state=>state.auth);
         const {ReviewList}=useSelector(state=>state.reviewProduct);
function handleRatingChange(getrating){
  setrating(getrating)
}



 
  const dispatch=useDispatch()
  function handleDialogClose(){
    setOpen(false);
    dispatch(setProductDetails())

    setrating(0)
    setReviewMSG("")
  }


  
  useEffect(()=>{
    if(productDetails?._id)
    dispatch(getProductReview(productDetails._id))
  },[productDetails])
 
  
  if (!productDetails) return null; 
  function  handleaddProductReview(){
    dispatch(addProductReview({
          productId:productDetails._id,
    userId:user.id,
    userName:user.userName,
    reviewMessage:reviewMSG,
    reviewValue:rating
    })).then((data)=>{
      if(data?.payload?.success){
        setrating(0);
        setReviewMSG(" ")
        dispatch(getProductReview(productDetails._id))
        toast("Review added successfully")
      }else {
            toast.error(data?.payload?.message ) // ✅ show error
        }

    })
  }
          const averageReview =ReviewList &&ReviewList.length >0?
          ReviewList.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/ReviewList.length:0

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
                  <StarRatingComponent rating={averageReview} />
                             <span>({averageReview})</span>
                </div>
   
              
                
        <div className="mt-5 mb-5">
          {
            productDetails.totalStock===0? <Button className="w-full opacity-60 cursor-not allowed" >Out Of Stock</Button>:        <Button onClick={()=>{handleAddtoCart(productDetails._id,productDetails.totalStock); setOpen(false)}} className="w-full" >Add to Cart</Button>
          }

        </div>
        <Separator />
        <div className="max-h-[300px] overflow-auto">
          <h2 className="text-xl font-bold mb-4">
            Reviews
          </h2>
          <div className="grid gap-6">
            {
              ReviewList && ReviewList.length>0?ReviewList.map(reviewItem=>   <div className="flex gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarFallback >
       {reviewItem?.userName?.[0]?.toUpperCase()}
              </AvatarFallback>
                </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{reviewItem.userName}</h3>
                </div>
                <div className="flex items-center gap-0.5">

                  <StarRatingComponent rating={reviewItem.reviewValue}/>
                 
                </div>
                <p className="text-muted-foreground">{reviewItem.reviewMessage}</p>
              </div>
          
            </div>): <h1>NO Reviews</h1>
            }
         
          </div>
        <div className="mt-10 flex-col flex gap-2">
          <Label>Write a Review</Label>
          <div className="flex">
            <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange}/>
          </div>
          <Input placeholder="Write a review... " name="reviewMSG" value={reviewMSG} onChange={(event)=>setReviewMSG(event.target.value)}/>
         <Button disabled={!reviewMSG.trim()}  onClick={handleaddProductReview}>Submit</Button>

        </div>
        </div>
      </div>
</DialogContent>

        </Dialog>
    )
}
export default ProductDetailsDialog


