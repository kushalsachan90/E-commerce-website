const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
      Email:{
        type:String,
        required:true,
        unique:true
    },
       Password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        default:'user'
    }
})

const User=mongoose.model('User',UserSchema);
module.exports =User
