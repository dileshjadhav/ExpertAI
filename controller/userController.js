import { User } from "../models/userSchema.js";
//import { generateToken } from "../utils/jwtToken.js";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const userregisterd = async (req,res,next)=>{
    const {firstname,lastname,email,phone,dob,gender,password,role}=req.body;
    if(!firstname||!lastname||!email||!phone||!dob||!gender||!password||!role){
        return res.status(400).json({success:false,message:"this is required"})
    }
    const user = await User.findOne({ email }); 
    if(user){
        return res.status(400).json({success:false,message:"alredy exists"})
    }

    generateToken(user,"user Registered",200,res);

    //   user = await User.create(firstname,lastname,email,phone,dob,gender,password,role);
    //   return res.status(200).json({success:true,message:"created"});
};

export const login = async(req,res,next)=>{
    const{email,password,confirmPassword,role}=req.body;
    if(!email||!password||!confirmPassword||!role){
        return res.status(400).json({success:false,message:"please fill full form"});
    }
    if(password!=confirmPassword){
        return res.status(400).json({success:false,message:"wrong password"});
    }
    const user = await User.findOne({ email }).select("+password");
    if(!user){
        return res.status(400).json({success:false,message:"invalid user"});
    }
    const ispasswordMatched = await user.comparepassword(password);
    if(!ispasswordMatched){
        return res.status(400).json({success:false,message:"invalid password"});
    }
    if(role !== user.role){
        return res.status(400).json({success:false,message:"user with this role doesnt matched"});
    }

    generateToken(user,"user Login",200,res);
    // res.status(200).json({success:true,message:"sucessfully login"});
};

export const addnewAdmin = async(req,res,next)=>{
    const{firstname,lastname,email,phone,dob,gender,password,role}=req.body;
    if(!email||!password||!confirmPassword||!role){
        return res.status(400).json({success:false,message:"please fill full form"});
    }
    const isRegistered = await User.findOne({ email });
    if(isRegistered){
        return res.status(400).json({success:false,message:"user with this email already exists"});
    }
    const admin = await User.create({firstname,lastname,email,phone,dob,gender,password,role:"Admin"});

    res.status(200).json({success:true,message:"admin registered"});

};

export const getAllExperts = async(req,res,next)=>{
    const expert = await User.find({role: "Expert"});
    res.status(200).json({success:true,expert})
};

export const getUserDetails = async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({success:true,user});

};

export const logoutAdmin = async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .json({success:true,message:"Admin logout successfully"})
};

export const logoutUser = async(req,res,next)=>{
    res.status(200).cookie("userToken","",{
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .json({success:true,message:"user logout successfully"})
};

export const addNewExperts = async(req,res,next)=>{
    if(!req.files||Object.keys(req.files).length===0){
        return res.status(400).json({success:false,message:"doctor avtar is required"});
    }
    const { expavtar }=req.files;
    const allowedFormats = ["image/png","image/jpeg","image/webp"];
    if(!allowedFormats.includes(expavtar.mimetype)){
        return res.status(400).json({success:false,message:"file format not supported"});

    }

    const{firstname,lastname,email,phone,dob,gender,password,expertDepartment}=req.body;
    if(!firstname||!lastname||!email||!phone||!dob||!gender||!password||!expertDepartment){
        return res.status(400).json({success:false,message:"please fill full details of experts"});

    }

    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return res.status(400).json({success:false,message:"this id already registered with the same email"});
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        expavtar.tempFilePath
    );
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(
            "cloudinary error:",cloudinaryResponse.error || "unknown cloudinary error"
        );

    }
    const expert = await User.create({firstname,lastname,email,phone,dob,gender,password,expertDepartment,role:"expert",expavtar:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url,
    }});
    return res.status(200).json({success:true,message:"expert registered!",expert});


    
    
    

}
