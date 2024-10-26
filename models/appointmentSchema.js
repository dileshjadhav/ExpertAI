import mongoose  from "mongoose";
import validator from "validator";


const appointmentschema = new mongoose.Schema({
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

   appointment_date:{
    type:String,
    required:true,
   },

   department:{
    type:String,
    required:true,
   },
   expert:{
    firstname:{
        type:String,
        required:true,
       },

       lastname:{

        type:String,
        required:true,
       },
    },
    hasvisited:{
        type:Boolean,
        default:false,
    },
    expertId:{
        type: mongoose.Schema.ObjectId,
        required:true,

    },
    userId:{
        type: mongoose.Schema.ObjectId,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending",
    }
   

})
  
export const appointment = new mongoose.model("appointment",appointmentschema);