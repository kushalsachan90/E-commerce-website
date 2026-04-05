
const mongoose=require("mongoose");

const FeatureSchema=new mongoose.Schema({
    image:String,
},{timestamps:true})

module.export=mongoose.model('Feature',FeatureSchema)