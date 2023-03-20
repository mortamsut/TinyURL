import users from '../models/Users.js';

const UserContext={

  getAllUsers: async()=>{
    let Users= await users.find();
    return Users;
  },
  getUserById: async(name,password)=>{
    let User= await users.findOne({name});
    console.log("password context ",password)
    console.log("get user in context ",User) 
    if(User&&password==User.password)
       return User;
   else if (!User){ return null;}
   else if(password!=User.password) 
           {return -1; } 
  },
  getLinks: async()=>{
    let Links= await users.find({links});//איך לעשות שיחזיר רק את מערך הלינקים  
    return Links;
  },
  getLinkById: async(index)=>{
    const Link=await users.find({links});
    let link=Link[index-1];
    return link;
  },
  addUser: async({name,email,password})=>{
    console.log("add user");
    const newuser=new users({name,email,password});
    newuser.save();
    return newuser;
  },
  updateUser: async(id,user)=>{
    let checkusr=await users.findById(id);
    if(checkusr.name!=user.name && findByUserName(user.name))
         return null;

    let updateUser= await users.findByIdAndUpdate(id,user);
    // updateUser.save();
    return updateUser;
  },
  deleteUser: async(id)=>{
    let deleteUse=await users.findByIdAndRemove(id);
    return deleteUse;
  },
  addLink: async(id,uniqueName)=>{
    let user= await users.findOne({_id:id}); 
   user.links.push({uniqueName});
   user.save();
   return user;
  },
  findByUserName: async(name)=>{
     let usrname= await users.findOne({name});
     return usrname;
  }


}
export default UserContext;