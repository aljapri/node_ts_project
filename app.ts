import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();
dotenv.config({path:".env"});
app.use(express.json());
app.use(express.urlencoded());


export default app;