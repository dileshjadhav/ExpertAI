import express from "express";
import { addnewAdmin, addNewExperts, getAllExperts, getUserDetails, login, logoutAdmin, logoutUser, userregisterd } from "../controller/userController.js";
import {isadminAuthenticated,isuserAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/register",userregisterd);
router.post("/login",login);
router.post("/admin/addnew",isadminAuthenticated,addnewAdmin);
router.get("/experts",getAllExperts);
router.get("/admin/me",isadminAuthenticated,getUserDetails);
router.get("/user/me",isuserAuthenticated,getUserDetails);
router.get("/admin/logout",isadminAuthenticated,logoutAdmin);
router.get("/user/logout",isuserAuthenticated,logoutUser);
router.post("/expert/addnew",isadminAuthenticated,addNewExperts);


export default router;