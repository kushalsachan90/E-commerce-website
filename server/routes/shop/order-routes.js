const express=require('express');

const {createOrder,capturePayment,getAllOrdersByUser,getAllOrdersDetails}=require('../../controllers/shop/order-controller')

const router=express.Router();

router.post('/create',createOrder)

router.post('/capture',capturePayment)

router.get('/OrderByUser/:userId',getAllOrdersByUser);
router.get('/getOrderDetails/:id',getAllOrdersDetails)

module.exports=router