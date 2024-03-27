import mongoose,{Document,Schema} from "mongoose";
import express from "express";
import bcrypt from "bcryptjs";

interface UserDocuments extends Document {
    id:string
    name: string;
    email: string;
    photo: string;
    role: string;
    password:string | undefined;
    active:string | undefined;
    comparePassword:(enteredpassword:string,userpassword:string)=>{}
}
const userSchema = new mongoose.Schema<UserDocuments>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    photo:{
        type:String,
        default:"defaul.jpg"
    },
    role:{
        type:String,
        default:"user"
    },
    password:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        default:true,
        select:false
    }

})



userSchema.pre("save", async function(next ){
    if(this.password !=undefined){
        const password = await bcrypt.hash(this.password,12);
        this.password = password;
        next();
    }
})

userSchema.methods.comparePassword = async function (enteredpassword:string,userpassword:string) {
    return await bcrypt.compare(enteredpassword,userpassword)
}

const User = mongoose.model<UserDocuments>("User",userSchema);

export default User;