import { check } from "express-validator";
import validate from "../../middleWare/validationMiddleWare";
import User from "../../models/userModel";
import { relative } from "path";


export const signupValdation = validate([
    check("name").trim().notEmpty().withMessage("User required")
    .isLength({min:3}).withMessage("Too short User name")
    .isLength({max:20}).withMessage("Too long 3-20 char"),
    check("email").trim().notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom( async (email)=>{
        const user = await User.findOne({email:email});
        if(user){
            throw new Error('Email is already exist');
        }
        return true;
    })
    ,
    
    check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true
    }),
    check('passwordConfirm')
    .notEmpty()
    .withMessage('Password confirmation required'),
]);

export const loginValdation = validate([
  check("email").trim().notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
])