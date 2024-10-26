import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:[3],
        
    },

    lastname:{
        type:String,
        required:true,
        minlength:[3],

    },

   email:{
    type:String,
    required:true,
    validate:[validator.isEmail,"please provide valid email"],
   },

   phone:{
    type:String,
    required:true,
    maxlength:[10],
    minlength:[10],
   },

   dob:{
    type: Date,
    required:true,

   },

   gender:{
    type:String,
    required:true,
    enum:["male","female","others"],

   },
   password:{
    type:String,
    required:true,
    minlength:[8,"it contains 10 character"],
    select:false,
 },
 role:{
    type:String,
    required:true,
    enum:["admin","expert","user"],
 },

 expertDepartment:{
    type:String,
 },
 expavtar:{
    public_id:String,
    url:String,

 },

});

userschema.pre("save",async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,8);
    
});
userschema.methods.comparepassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};
userschema.methods.generateJsonWebToken  = function(){
    return jwt.sign({id:this._id},process.env.JWT_API_SECRET,{
        expiresIn:process.env.JWT_EXPIRES,
    });
};




export const User = mongoose.model("User",userschema);