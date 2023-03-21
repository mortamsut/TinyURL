
import context from "../Context/UserContext.js";
import  jwt  from "jsonwebtoken";

const secret="tiny##url*byMor";
const AuthController={

    signUp: async(req,res)=>{
        const {name,email,password}=req.body;
        const usrName= await context.findByUserName(name);
        if(!usrName)
        {
            const newUser = await context.addUser({name,email,password});
            const token = jwt.sign({name:newUser.name, id:newUser._id},secret);
            res.send({accessToken:token});
        }
        else
        res.status(401).send("This user name already exists")
    },
    signIn: async(req,res)=>{
        const password=req.query.password
        console.log("password controller ",password)
        const user=await context.signIn(req.params.name,password);
        console.log("get user in controller ",user) 
        console.log("get user by id");
        if(user&&user!=-1)
         { 
            const token=jwt.sign({name:user.name, id:user._id},secret)
            res.send({accessToken:token});
         }
        else if(!user){
            res.status(401).send("The name is wrong");}
        else if(user==-1)
           {   res.status(401).send("The password is wrong");}
    },
}
export default AuthController;