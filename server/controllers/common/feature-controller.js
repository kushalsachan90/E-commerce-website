const Feature=require('../../models/features')

const addFeatureImage=async(req,res)=>{

    try {
        const {image}=req.body
        const featuresImage=new  Feature({image})

        await featuresImage.save();

        res.status(201).json({
            success:true,
            data:featuresImage
        })
    } catch (error) {
        console.log(e);
        res.status(500).json({
            success:false,

            message:"some Error Occurred!"
        })
    }
}


const getFeatureImage=async(req,res)=>{
    try {
        const images=await  Feature.find({})

         res.status(201).json({
            success:true,
            data:images
        })
    } catch (error) {
        console.log(e);
        res.status(500).json({
            success:false,

            message:"some Error Occurred!"
        })
    }
}

module.exports={addFeatureImage,getFeatureImage}