


const {addAddress,editAddress,deleteAddress,fetchAllAddress}=require("../../controllers/shop/address-controllers")
const express=require("express");
const router=express.Router();

router.post('/addAddress',addAddress);
router.get('/fetchAddress/:userId',fetchAllAddress);
router.put('/editAddress/:userId/:addressId',editAddress);
router.delete('/deleteAddress/:userId/:addressId/',deleteAddress)

module.exports=router