const express=require('express');

const {getAllOrdersOfAllUser, updateOrderStatus}=require('../../controllers/admin/order-controller');
const { getAllOrdersDetailsforAdmin } = require('../../controllers/admin/order-controller');


const router=express.Router();

router.get('/get',getAllOrdersOfAllUser)
router.get('/details/:id',getAllOrdersDetailsforAdmin)
router.put('/update/:id',updateOrderStatus)

module.exports=router