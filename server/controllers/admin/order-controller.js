const Order=require('../../models/orders')

const getAllOrdersOfAllUser=async(req,res)=>{
  try {
    // const {userId}=req.params;
    const orders=await Order.find()  // return arrayof Object
   
    if(orders.length==0){
      return res.status(404).json({
        success:false,
        message:'no order found'
      })
    }
    res.status(200).json({
      success:true,
      message:orders
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:'some error occurred',
    })
  }
}
const getAllOrdersDetailsforAdmin=async(req,res)=>{
  try {
   const {id}=req.params;
       const order=await Order.findById(id)  // return object only 
   
    if(!order){
      return res.status(404).json({
        success:false,
        message:'order not found'
      })

  } 
  res.status(200).json({
      success:true,
      message:order
    })
}catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:'some error occurred',
    })
  }
}

const updateOrderStatus=async (req,res)=>{
  try {
    const {id}=req.params
    const {orderStatus}=req.body
        const order=await Order.findById(id)  // return object only 
   
    if(!order){
      return res.status(404).json({
        success:false,
        message:'order not found'
      })
    }

    await Order.findByIdAndUpdate(id,{orderStatus})

    res.status(200).json({
      success:true,
      message:"order status updated successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success:false,
      message:"some error occurred"
    })
  }
}

module.exports={getAllOrdersOfAllUser,getAllOrdersDetailsforAdmin,updateOrderStatus}