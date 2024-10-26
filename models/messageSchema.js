import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:[3]         
    },

    lastname:{
        type:String,
        required:true,
        minlength:[3]

    },

   email:{
    type:String,
    required:true,
    validate:[validator.isEmail,"please provide valid email"]
   },

   phone:{
    type:String,
    required:true,
    maxlength:[10],
    minlength:[10]
   },

   message:{
    type:String,
    required:true,
    maxlength:[30]
   }
});

export const Messages = mongoose.model("Messages", messageSchema);