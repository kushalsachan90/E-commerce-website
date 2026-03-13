const express=require('express');

const {addToCart,fetchCartItem,DeleteCartItem,updateCartItem}=require('../../controllers/shop/Cart-Controller')

const router=express.Router();

router.post('/add',addToCart);
router.get('/get/:userId',fetchCartItem);
router.put('/update-cart',updateCartItem);
router.delete('/delete-cart/:userId/:productId',DeleteCartItem)

module.exports=router