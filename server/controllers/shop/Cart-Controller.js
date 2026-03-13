
const Cart=require('../../models/cart')
const Product=require('../../models/product')
const User=require('../../models/User')


const addToCart=async(req,res)=>{
    try{
       const {userId,productId,quantity}=req.body;
       if(!userId||!productId||quantity<=0){
        res.status(400).json({
            success:false,
            message:"Invalid Data is Provided!"
        })
       }

 const product =await Product.findById(productId);
 if(!product){
    res.status(400).json({
        success:false,
        message:'Product Not Found'
    })
 }

 let cart=await Cart.findOne({userId});
 if(!cart){
    cart=new Cart({userId,items:[]})
 }
 const findCurrentProductIndex=cart.items.findIndex(item=>item.productId.toString()===productId)
 if(findCurrentProductIndex===-1){
    cart.items.push({
        productId:productId, 
        quantity:quantity})
 }
 else{
    cart.items[findCurrentProductIndex].quantity+=quantity;
 }
     await cart.save();
     res.status(200).json({
        success:true,
        data:cart
     })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Error'
        })
    }
}



const fetchCartItem=async(req,res)=>{
    try{
          const {userId}=req.params;
          if(!userId){
            return res.status(400).json({
                success:false,
                message:"User id is mandatory!"
            })
          }

          const cart=await Cart.findOne({userId}).populate({
            path:'items.productId',
            select:"image title price salePrice"
          })
          if(!cart){
            return res.status(404).json({
                success:false,
                message:"Cart not found!",
            });
          }
           const validItems=cart.items.filter(productItem =>productItem.productId);
           if(validItems.length<cart.items.length){
            cart.items=validItems
            await cart.save()
           }
           const populateCartItems=validItems.map(Item=>({
            productId:Item.productId._id,
            image:Item.productId.image,
            title:Item.productId.title,
            price:Item.productId.price,
            salePrice:Item.productId.salePrice,
            quantity:Item.quantity

           }))
           res.status(200).json({
            success:true,
            data:{
                ...cart._doc,
                items:populateCartItems
            }
           })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Error'
        })
    }
}

const updateCartItem=async(req,res)=>{
    try{
const {userId,productId,quantity}=req.body;
       if(!userId||!productId||quantity<=0){
        res.status(400).json({
            success:false,
            message:"Invalid Data is Provided!"
        })
       }
       const cart=await Cart.findOne({userId})
       if(!cart){
        return res.status(404).json({
            success:false,
            message:"cart Not Found"
        })
       }

       const findCurrentProductIndex=cart.items.findIndex(item=>item.productId.toString()===productId);

        if(findCurrentProductIndex===-1){
            res.status(404).json({
                success:false,
                message:"Cart Item is not Present"
            })
        }
        cart.items[findCurrentProductIndex].quantity=quantity
        await cart.save();
        await cart.populate({
            path:'items.productId',
            select:'image title price salePrice'
        })
       const populateCartItems=cart.items.map(Item=>({
            productId:  Item.productId?Item.productId._id:null,
            image:Item.productId?Item.productId.image:null,
            title:Item.productId?Item.productId.title:"product not found",
            price:Item.productId?Item.productId.price:null,
            salePrice:Item.productId?Item.productId.salePrice:null,
            quantity:Item.quantity

           }))

           res.status(200).json({
            success:true,
            data:{
                ...cart._doc,
                items:populateCartItems
            }
           })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Error'
        })
    }
}

const DeleteCartItem=async(req,res)=>{
    try{
       const {userId,productId}=req.params;
        if(!userId||!productId){
        res.status(400).json({
            success:false,
            message:"Invalid Data is Provided!"
        })
       }
       const cart=await Cart.findOne({userId}).populate({
        path:"items.productId",
        select:"image title price salePrice"
       })
         if(!cart){
        return res.status(404).json({
            success:false,
            message:"cart Not Found"
        })
       }

       cart.items=cart.items.filter(item=>item.productId._id.toString()!==productId)
       await cart.save();

         const populateCartItems=cart.items.map(Item=>({
            productId:  Item.productId?Item.productId._id:null,
            image:Item.productId?Item.productId.image:null,
            title:Item.productId?Item.productId.title:"product not found",
            price:Item.productId?Item.productId.price:null,
            salePrice:Item.productId?Item.productId.salePrice:null,
            quantity:Item.quantity

           }))

           res.status(200).json({
            success:true,
            data:{
                ...cart._doc,
                items:populateCartItems
            }
           })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Error'
        })
    }
}

module.exports={
    addToCart,updateCartItem,fetchCartItem,DeleteCartItem
}