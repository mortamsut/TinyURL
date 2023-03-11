import context from '../Context/UserContext.js'

const UserController={

    getAllUsers: async(req,res)=>{
        const Users=await context.getAllUsers();
        console.log("get users");
        res.send(Users);
    },
    getUserById: async(req,res)=>{
        const user=await context.getUserById(req.params.id);
        console.log("get user by id");
        res.send(user);
    },
    getLinks: async(req,res)=>{
        const Links=await context.getLinks();
        console.log("get links");
        res.send(Links);
    },
    getLinkById: async(req,res)=>{
        const Link= await context.getLinkById(req.params.id);
        res.send(Link);

    },
    addUser: async(req,res)=>{
        const {name,email,password}=req.body;
        const newUser= await context.addUser({name,email,password});
        res.send(newUser);
    },
    updateUser: async(req,res)=>{
        const {id}=req.params;
        const {name,email,password}=req.body;
        const update= await context.updateUser(id,{name,email,password});
        res.send(update);
    },
    deleteUser: async(req,res)=>{
        const {id}=req.params;
        const deleted=await context.deleteUser(id);
        res.send(deleted);
    }
}
export default  UserController;