const Order=require('../../models/orders')
const Product=require('../../models/product')
const Review=require('../../models/review')

const addProductReview=async(req,res)=>{
    try {
        const {productId,userId,userName,reviewMessage,reviewValue}=req.body;
        const order=await Order.findOne({
            userId:userId,
            "cartItems.productId":productId,
             orderStatus:'confirmed'
        })
        
        if(!order){
            return res.status(404).json({
                success:false,
                message:"you need to purchase product first to review it"
            })
        }
        const checkExistingReview =await Review.findOne({productId:productId,userId:userId})
        if(checkExistingReview){
            return res.status(400).json({
                success:false,
                message:"you already reviewed this project"
            })
        }
        const newReview=new Review({
            productId,userId,userName,reviewMessage,reviewValue
        })
        await newReview.save()

        const reviews=await Review.find({productId});
        const totalReviewLength=reviews.length;
        const averageReview =reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/totalReviewLength
        await Product.findByIdAndUpdate(productId,{averageReview})
        res.status(201).json({
            success:true,
            data:newReview
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Error'
        })
    }
}



const getProductReview=async(req,res)=>{
    try {
        
const {productId}=req.params;
const reviews=await Review.find({productId});

 res.status(201).json({
            success:true,
            data:reviews
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Error'
        })
    }
}


module.exports={addProductReview,getProductReview}