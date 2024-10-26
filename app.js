import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbconnection } from "./db/dbconnection.js";
import userRouter from "./router/userRouter.js";
import messageRouter from "./router/messageRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";




const app = express();
config({path:"./config/config.env"});

app.use(cors ({
    origin:[process.env.FRONTEND_URI,process.env.DASHBOARD_URI],
    methods:["GET","POST","UPDATE","DELETE"],
    Credential:true,
}));

app.use(cookieParser());
app.use(express.json()); //to pass string
app.use(express.urlencoded({extended:true}));//to recognize date like 07-11-2024

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

app.use("/api/v2/messages",messageRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v4/appointment",appointmentRouter);
dbconnection();



export default app;