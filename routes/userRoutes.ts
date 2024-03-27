import express, { Router } from "express";
import { login, signup } from "../controllers/auth";
import { signupValdation,loginValdation } from "../utils/validation/authValidation";
const router = express.Router();
router
.route("/user/signup")
.post(signupValdation,signup);

router
.route("/user/login")
.post(loginValdation,login);


export default router;