import express  from "express";
import { deleteAppointment, getAllAppointments, postappointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import {isadminAuthenticated,isuserAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/post",isadminAuthenticated,isuserAuthenticated,postappointment);
router.get("/getallappointment",isadminAuthenticated,getAllAppointments);
router.put("/update/:id",isadminAuthenticated,updateAppointmentStatus);
router.delete("/delete/:id",isadminAuthenticated,deleteAppointment)

export default router;