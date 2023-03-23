import users from '../models/Users.js';
import links from '../models/LinksModel.js';
const UserContext={

  getAllUsers: async()=>{
    let Users= await users.find();
    return Users;
  },
   getUserById:async(id)=>{
    let user= await users.findOne({_id:id})
    return user;
   },
   signIn: async(name,password)=>{
    let User= await users.findOne({name});
    console.log("password context ",password)
    console.log("get user in context ",User) 
    if(User&&password==User.password)
       return User;
   else if (!User){ return null;}
   else if(password!=User.password) 
           {return -1; } 
  },
  // getLinks: async()=>{

  //   let Links= await users.find({links});//איך לעשות שיחזיר רק את מערך הלינקים  
  //   return Links;
  // },
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
  addUserLink: async(userId,linkid)=>{
    console.log("link id ",linkid)
    let user= await users.findOne({_id:userId}); 
   user.links.push(linkid);
   user.save();
   return user;
  },
  findByUserName: async(name)=>{
     let usrname= await users.findOne({name});
     return usrname;
  },
  deleteLinkById: async(userId,linkId)=>{

    let user = await users.findOne({_id:userId});
    console.log ("the user in delete link ",user);
    
    for (let index = 0; index < user.links.length; index++) {
         if(user.links[index]._id==linkId)
           { 
           user.links.splice(index,1);
            user.save();
            console.log(user);
            return user;
           }
    }
    return null;
  }


}
export default UserContext;