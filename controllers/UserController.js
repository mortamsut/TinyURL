import context from '../Context/UserContext.js'
import jwt  from 'jsonwebtoken';

const secret="tiny##url*byMor";
const UserController={

    getAllUsers: async(req,res)=>{
        const Users=await context.getAllUsers();
        console.log("get users");
        res.send(Users);
    },
    // getUserById: async(req,res)=>{
    //     const password=req.query.password
    //     console.log("password controller ",password)
    //     const user=await context.getUserById(req.params.name,password);
    //     console.log("get user in controller ",user) 
    //     console.log("get user by id");
    //     if(user&&user!=-1)
    //      { 
    //         const token=jwt.sign({name:user.name, password: user.password},secret)
    //         res.send({accessToken:token},user);
    //      }
    //     else if(!user){
    //         res.status(401).send("The name is wrong");}
    //     else if(user==-1)
    //        {   res.status(401).send("The password is wrong");}
    // },
    getLinks: async(req,res)=>{
        const Links=await context.getLinks();
        console.log("get links");
        res.send(Links);
    },
    getLinkById: async(req,res)=>{
        const Link= await context.getLinkById(req.params.id);
        res.send(Link);

    },
    // addUser: async(req,res)=>{
    //     const {name,email,password}=req.body;
    //     const usrName= await context.findByUserName(name);
    //     if(!usrName)
    //     {
    //         const newUser= await context.addUser({name,email,password});
    //         const token=jwt.sign({name:newUser.name, password: newUser.password},secret)
    //         res.send({accessToken:token},newUser);
    //     }
    //     else
    //     res.status(401).send("This user name already exists")
    // },
    updateUser: async(req,res)=>{
        const {id}=req.params;
        const {name,email,password}=req.body;       
        const update= await context.updateUser(id,{name,email,password});
        if(update)
        res.send(update);
        else
        res.status(401).send("This user name already exists")
    },
    deleteUser: async(req,res)=>{
        const {id}=req.params;
        const deleted=await context.deleteUser(id);
        res.send(deleted);
    },

    //כשנרצה להוסיך לינק עבור המשתמש נצטרך לבצע קריאת הקסיוס בריאקט אחת בתוך השניה 
    addLink: async(req,res)=>{
        const {id}=req.params; 
        const {uniqueName}=req.body;
        let addlink= await context.addLink(id,{uniqueName});
        res.send(addlink)
    }
}
export default  UserController;