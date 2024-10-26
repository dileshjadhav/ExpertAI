import express, { Router }  from "express";
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import { isadminAuthenticated } from "../middlewares/auth.js";

const router= express.Router();

router.post("/send",sendMessage);
router.get("/getall",isadminAuthenticated,getAllMessages);

export default router;