import express from "express";
import User from "../models/userModel";
import jwt  from "jsonwebtoken";
import { signToken } from "../utils/helper";
const signup = ( async (req:express.Request,res:express.Response)=>{
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
      });
    user.password = undefined;
    user.active = undefined;

    res.status(200).json({
        message:"success",
        data:user
    })
})

const login = ( async (req:express.Request,res:express.Response)=>{
    const user = await User.findOne({email:req.body.email}).select("+password");
    if(!user ||  !await user.comparePassword(req.body.password,user.password||"")){
        return res.status(400).json({
            status:"falied",
            message:"email or password is wrong",   
        })
    }

    const token = signToken(user.id);
    user.password = undefined;
    user.active = undefined;
    res.status(200).json({
        message:"success",
        data:user,
        token
    })
})




export {signup,login};