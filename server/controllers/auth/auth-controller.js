const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const User=require('../../models/User');


//register

const registerUser=async(req,res)=>{
    const {userName,email,password}=req.body;

    try{
        const checkUser=await User.findOne({Email:email})
        if(checkUser) return res.json({success:false,message:'User already Present'})
 const hashPassword= await bcrypt.hash(password,12);
 const newUser=new User({
    userName:userName,
    Email:email,
    Password:hashPassword
 })
 await newUser.save();
 res.status(200).json({
    success:true,
    message:"User registered successfully"
 })
    }
    catch(error){
        console.log(error);
        res.status(404).json({
            message:"Some error occurred"
        })
    }
}


// login
const LoginUser=async(req,res)=>{
    const {email,password}=req.body;

    try{
     const checkUser=await User.findOne({Email:email});
     if(!checkUser) return res.json({
        success:false,
        message:"User doesn't exist please register first"
     })
           
 const checkPassword=await bcrypt.compare(password,checkUser.Password);
 if(!checkPassword) return res.json({
    success:false,
    message:"password did not match"
 })
     const token = jwt.sign({
        id:checkUser._id,role:checkUser.role,Email:checkUser.Email,userName:checkUser.userName
     },'CLIENT_SECRET_KEY',{expiresIn:'60m'})
     res.cookie('token',token,{httpOnly:true,secure:false}).json({
        success:true,
        message:'Logged in successfully',
        user:{
            Email:checkUser.Email,
            role:checkUser.role,
            id:checkUser._id,
            userName:checkUser.userName

        }
     })


    }
    catch(error){
        console.log(error);
        res.status(404).json({
            message:"Some error occurred"
        })
    }
}

// logout
const logoutUser=async(req,res)=>{
    res.clearCookie('token').json({
        success:true,
        message:"Logged Out successfully"
    })
    
}
//auth middleware

const authMiddleware=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token) return res.status(401).json({
        success:false,
        message:'Unauthorised user! '
    })
    try{
        const decoded=jwt.verify(token,'CLIENT_SECRET_KEY');
        req.user=decoded;
            next();
    }
    catch(error){
        res.status(401).json({
            success:false,
        message:'Unauthorised user!'
        })
    }
}

module.exports={registerUser,LoginUser,logoutUser,authMiddleware}