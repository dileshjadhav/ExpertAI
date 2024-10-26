//import { Messages } from "../models/messageSchema.js";
import { Messages } from "../models/messageschema.js";

export const sendMessage = async(req,res,next)=>{

    const{firstname,lastname,email,phone,message}=req.body;
    if(!firstname||!lastname||!email||!phone||!message){
        return res.status(400).json({success:false,message:"please fill full form"});
    }

  await Messages.create({firstname,lastname,email,phone,message}) ;
  res.status(200).json({success:true,message:"sent"});

};

export const getAllMessages = async (req,res,next)=>{

  const messages = await Messages.find();
  res.status(200).json({success:true,messages})
}

