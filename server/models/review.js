 const mongoose=require('mongoose')

 const productReviewSchema= new mongoose.Schema({
    productId:String,
    userId:String,
    userName:String,
    reviewMessage:String,
    reviewValue:Number
 },{timestamps:true})

 module.exports=mongoose.model('ProductReview',productReviewSchema)