const Address=require('../../models/address')



const addAddress=async(req,res)=>{
    try{
         const {userId, address,city,pincode,phone,notes}=req.body
         if(!userId||!address||!city||!pincode||!phone||!notes){
            return res.status(400).json({
                success:false,
                message:'Invalid Data Provided'
            })
         }
         const newlyCreatedAddress=new Address({
            userId:userId,
            address:address,
            city:city,
            pincode:pincode,
            phone:phone,
            notes:notes
         })
         await newlyCreatedAddress.save();
         res.status(201).json({
            success:true,
            message:newlyCreatedAddress
         })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Server Error'
        })
    }
}


const editAddress=async(req,res)=>{
    try{

    }
    catch(error){
        console.log(error);
        res.status(404).json({
            success:false,
            message:'Error'
        })
    }
}


const fetchAllAddress=async(req,res)=>{
    try{

    }
    catch(error){
        console.log(error);
        res.status(404).json({
            success:false,
            message:'Error'
        })
    }
}


const deleteAddress=async(req,res)=>{
    try{

    }
    catch(error){
        console.log(error);
        res.status(404).json({
            success:false,
            message:'Error'
        })
    }
}


module.exports={addAddress,editAddress,fetchAllAddress,deleteAddress}
