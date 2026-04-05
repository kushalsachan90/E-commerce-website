const paypal=require('../../helpers/paypal')
const Order =require('../../models/orders')
const Cart=require('../../models/cart')
const Product=require('../../models/product')

const createOrder=async(req ,res)=>{
    try {
        const {userId,cartItems,addressInfo,orderStatus,paymentMethod,paymentStatus,totalAmount,orderDate,orderUpdateDate,paymentId,payerId,cartId}=req.body;

         const create_payment_json = {
  intent: 'sale',
  payer: {
    payment_method: 'paypal'
  },
  redirect_urls: {
    return_url: 'http://localhost:5173/shop/paypal-return',
    cancel_url: 'http://localhost:5173/shop/paypal-cancel'
  },
  transactions: [
    {
      item_list: {
        items: cartItems.map(item => ({
          name: item.title,
          sku: item.productId,
          price: item.price.toFixed(2),
          currency: "USD",
          quantity: item.quantity
        }))
      },
      amount: {
        currency: 'USD',
        total: totalAmount.toFixed(2)
      },
      description: "Order payment"
    }
  ]
};

paypal.payment.create(create_payment_json,async(error,paymentInfo)=>{   //callin the api of the paypal to create the payment
  if(error){
  console.log(error)
 return res.status(500).json({
  success:false,
  message:'Error while creating paypal'
 })
}
else{
  const newlyCreatedOrder =new Order({
    userId,cartItems,addressInfo,orderStatus,paymentMethod,paymentStatus,totalAmount,orderDate,orderUpdateDate,paymentId,payerId,cartId
  })
  await newlyCreatedOrder.save()
  const approvalUrl=paymentInfo.links.find(link=>link.rel==='approval_url').href;
  res.status(201).json({
    success:true,
    approvalUrl,
    orderId:newlyCreatedOrder._id
  })

}
})



    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"some error occurred"
        })
    }
}

const capturePayment=async(req ,res)=>{
    try {
        const {paymentId,payerId,orderId}=req.body
        let order=await Order.findById(orderId)
        if(!order){
          return res.status(400).json({
            success:false,
            message:'Order not found'
          })
        }
        order.paymentStatus='paid',
        order.orderStatus='confirmed',
        order.paymentId=paymentId,
        order.payerId=payerId;

       for (let item of order.cartItems) {
        
  let product = await Product.findById(item.productId);


  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product not found: ${item.title}`  // ✅ item.title, not product.title
    });
  }

  if (product.totalStock < item.quantity) {
    return res.status(400).json({
      success: false,
      message: `Not enough stock for ${product.title}`
    });
  }

  product.totalStock -= item.quantity;
  await product.save();
}
         
        const getCardId=order.cartId;
        await  Cart.findByIdAndDelete(getCardId)


        await order.save()
        res.status(200).json({
          success:true,
          message:'Order confirmed'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"some error occurred"
        })
    }
}

const getAllOrdersByUser=async(req,res)=>{
  try {
    const {userId}=req.params;
    const orders=await Order.find({userId})  // return arrayof Object
   
    if(!orders){
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


const getAllOrdersDetails=async(req,res)=>{
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
module.exports={capturePayment,createOrder,getAllOrdersByUser,getAllOrdersDetails}
































//! 1. What is this JSON?
// {
//   "links": [
//     { "rel": "self", "href": "..." },
//     { "rel": "approval_url", "href": "https://paypal.com/approve" },
//     { "rel": "execute", "href": "..." }
//   ]
// }

// 👉 This is the response from PayPal after creating a payment

// 🧠 What is links?

// 👉 links is an array of objects

// Each object gives you:

// rel → relation (what this link is for)
// href → actual URL
// 🔍 2. Meaning of each rel
// 🔹 "self"
// { "rel": "self", "href": "..." }

// 👉 Link to:

// View payment details (internal use mostly)
// 🔹 "approval_url" ⭐ (MOST IMPORTANT)
// { "rel": "approval_url", "href": "https://paypal.com/approve" }

// 👉 This is the link where:

// User goes to PayPal
// Logs in
// Approves payment
// 🔹 "execute"
// { "rel": "execute", "href": "..." }

// 👉 This is used later to:

// Finalize (execute) payment
// After user approves
// 🔥 3. Now this line
// link => link.rel === 'approval_url'

// 👉 This is an arrow function (callback)

// 🧠 What it means

// For each link in array:
// 👉 Check:

// link.rel === 'approval_url'

// 👉 Returns:

// true → if match found
// false → otherwise
// 🔍 4. Used with .find()
// const approvalUrl = paymentInfo.links.find(
//   link => link.rel === 'approval_url'
// ).href;
// 🧠 Step-by-step execution
// Given array:
// links = [
//   { rel: "self", href: "..." },
//   { rel: "approval_url", href: "https://paypal.com/approve" },
//   { rel: "execute", href: "..." }
// ]
// Step 1:

// Check first element:

// link.rel === "self" ❌
// Step 2:

// Check second element:

// link.rel === "approval_url" ✅

// 👉 Match found → stop searching

// Step 3:

// Return that object:

// { rel: "approval_url", href: "https://paypal.com/approve" }
// Step 4:

// Get .href

// approvalUrl = "https://paypal.com/approve"
// 🎯 Final Result
// approvalUrl = "https://paypal.com/approve"

// 👉 You send this to frontend
// 👉 User gets redirected to PayPal

// 💡 Simple analogy

// Think like:

// You have list:

// [
//   { type: "home" },
//   { type: "office" },
//   { type: "school" }
// ]

// You search:

// item => item.type === "office"

// 👉 .find() gives you:

// { type: "office" }
// ⚠️ Important Note

// .find():

// Returns FIRST match only
// Stops searching early (efficient)
// 🚀 Final Answer

// The links array contains different PayPal URLs for different actions. The .find(link => link.rel === 'approval_url') searches this array to get the specific URL where the user must go to approve the payment.

// If you want next:
// 👉 I can explain execute link + paymentId + payerId flow
// 👉 That’s the final step of PayPal integration 👍