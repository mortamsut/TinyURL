import express from 'express';
import bodyParser from "body-parser";
import UserRouter from "./Routers/UserRouter.js"
import LinkRouter from "./Routers/LinkRouter.js"
import dotenv from 'dotenv'
import connectDB  from './db.js';
import LinkController from './controllers/LinkController.js';
import cors from 'cors';
import  jwt  from 'jsonwebtoken';
import AuthRouter from './Routers/AuthRouter.js'

const secret="tiny##url*byMor";

dotenv.config();

const app =express()
const port=3010

connectDB();


app.use(cors())
app.use(bodyParser.json());

// app.get('/',(req,res)=>{
//     res.send()
// })
app.use("/auth",AuthRouter);
      
//middleware of jwt
app.use('/user',(req,res,next)=>{
    // if(!req.headers.authorization){ 
    //     console.log("redirect");
        
    // }
    console.log("------")
    //console.log("req",req)
   // console.log("-----------##############")
    console.log("header",req.headers.authorization);
   const token= req.headers.authorization.slice(7);
   console.log("token",token);
   try{
    const decoded= jwt.verify(token,secret);
    req.id=decoded.id;//מה לגבי פונקציות שלוקחות ID האם לשנות את כולם לקבל שם
    next(); 
   }
   catch{
    res.status(401).send({message:"unauthorized"});
   }
});
app.use('/links',(req,res,next)=>{
    console.log("header",req.headers.authorization);
   const token= req.headers.authorization.slice(7);
   console.log("token",token);
   try{
    const decoded= jwt.verify(token,secret);
    req.id=decoded.id;//מה לגבי פונקציות שלוקחות ID האם לשנות את כולם לקבל שם
    next(); 
   }
   catch{
    res.status(401).send({message:"unauthorized"});
   }
});
   
app.use('/user',UserRouter);
app.use('/links',LinkRouter);
app.get('/:uniqueName',LinkController.redirect);

app.listen(port, () => 
{ console.log(` http://localhost:${port}`)})


//jwt 
//for sign in and sign up router controller  auth
//send in jwt only id and name of user  
//add link go to link controller and send to user context add id of link  v