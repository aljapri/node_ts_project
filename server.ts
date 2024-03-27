import app from "./app";
import mongoose from "mongoose";
import DbConnection from "./utils/dbconnections";

const DB: string  = process.env.DB || "";


const db: DbConnection = new DbConnection(DB);
db.connect();

const port = process.env.PORT || 3000;
app.listen(3000,():void=>{
    console.log("connection success")
})