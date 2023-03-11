import express from 'express';
import bodyParser from "body-parser";
import UserRouter from "./Routers/UserRouter.js"
import LinkRouter from "./Routers/LinkRouter.js"
import dotenv from 'dotenv'
import connectDB  from './db.js';
import LinkController from './controllers/LinkController.js';

dotenv.config();

const app =express()
const port=3010

connectDB();

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send()
})

app.use('/user',UserRouter);
app.use('/links',LinkRouter);
app.get('/:uniqueName',LinkController.redirect);

app.listen(port, () => 
{ console.log(` http://localhost:${port}`)})