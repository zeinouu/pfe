import express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from'./routes/auth.js';
import dbconnectionRoute from './routes/dbconnection.js';
import cookieParser from "cookie-parser";
dotenv.config();

const app = express()

const connect = async ()=>{
    try {
      mongoose.set('strictQuery', false);
      const conn = await mongoose.connect(process.env.MONGO_URI,{
        //must add in order to not get any error masseges:
        useUnifiedTopology:true,
        useNewUrlParser: true
    })
    console.log(`mongo database is connected!!! ${conn.connection.host} `)
    }catch(error){
    console.error(`Error: ${error} `)
    process.exit(1) //passing 1 - will exit the proccess with error
    }}
       
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
        );
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, PATCH, OPTIONS"
        );
        next();
    });
      
    //ADDing Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/dbconnection", dbconnectionRoute);



app.listen(8801, () => {
    connect()
    console.log("Connecte to backend.");
});