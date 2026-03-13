
const express=require("express");
const {handleImageUpload,addProduct,DeleteProduct,editProduct,fetchAllProduct} = require("../../controllers/admin/product-controler")


const {upload}=require('../../helpers/cloudinary')

const router=express.Router();

router.post('/upload-image',upload.single('my_file'),handleImageUpload);

router.post('/add',addProduct);
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',DeleteProduct)
router.get('/get',fetchAllProduct)



module.exports=router
