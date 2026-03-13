const cloudinary =require('cloudinary').v2
const multer=require('multer')

cloudinary.config({
    cloud_name:"dodhevtjk",
    api_key:"492588721773726",
    api_secret:"KN3zATnRC6htraHL3_z7CwLQPx8"
})

const storage=new multer.memoryStorage();

async function imageUploadUtil(file){
    const result=await cloudinary.uploader.upload(file,{
        resource_type:'auto'
    })
    return result
}

const upload=multer({storage});
module.exports={upload,imageUploadUtil}