import mongoose  from "mongoose";

export const dbconnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbname:"Teacher_management"
    }).then(()=>{
        console.log("connected")
    }).catch((err)=>{
        console.log(`err found this ${err}`)
    })
}