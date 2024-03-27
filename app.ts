import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import routes
import router from "./routes/userRoutes";

const app = express();


// config app
dotenv.config({path:".env"});
app.use(express.json());
app.use(express.urlencoded());

//router 

app.use("/api",router)




export default app;