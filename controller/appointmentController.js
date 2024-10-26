//import {  appointment } from "../models/appointmentSchema.js";
import { appointment,  } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postappointment = async(req,res,next)=>{
    const {firstname,lastname,email,phone,dob,gender,appointment_date,department,expert_firstname,expert_lastname,hasvisited,address}=req.body;
    if(!firstname||!lastname||!email||!phone||!dob||!gender||!appointment_date||!department||!expert_firstname||!expert_lastname||!hasvisited||!address){
       return res.status(400).json({success:false,message:"this is required"})

    }
    const isconflict = await User.find({
        firstname:expert_firstname,
        lastname:expert_lastname,
        role:"expert",
        expertDepartment: department,

    });
    if(isconflict.length === 0){
        return res.status(404).json({success:false,message:"expert not found"})
    }
    if(isconflict.length > 1){
        return res.status(404).json({success:false,message:"expert conflict please constact through email"})
    }

    const expertId = isconflict[0]._id;
    const userId = req.user._id;
    const appointment = await appointment.create({

        firstname,
        lastname,
        email,
        phone,
        dob,
        gender,
        appointment_date,
        department,
        expert:{
            expert_firstname,
        expert_lastname,
        },
        hasvisited,
        address,
        expertId,
        userId
    })
     return res.status(200).json({success:true,message:"appointment sent",appointment})


}

export const getAllAppointments = async(req,res,next)=>{
    const appointments = await appointment.find();
     return res.status(200).json({success:true,appointments})
}

export const updateAppointmentStatus = async (req,res,next)=>{
    const {id} = req.params;
    let appointment = await appointment.findById(id);
    if(!appointment){
        return res.status(404).json({success:false,message:"Appointment Not found"})

    }
    appointment = await appointment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    return res.status(200).json({success:true,message:"Appointment Updated",appointment})
}

export const deleteAppointment = async(req,res,next)=>{
    const {id} = req.params;
    let appointment = await appointment.findById(id);
    if(!appointment){
        return res.status(404).json({success:false,message:"Appointment Not found"})
    }
    await appointment.deleteOne();
    return res.status(200).json({success:true,message:"Appointment Deleted"})
}