import users from '../models/Users.js';
import links from '../models/LinksModel.js';
import LinkContext from './LinkContext.js';

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
     console.log("linkId",linkId);
    let user = await users.findOne({_id:userId});
    console.log ("the user in delete link ",user);
    
    let filter_link= user.links.filter((val)=>{
      console.log("val= ",val,"val._id= ",val._id,"val.id= ",val.id);
      if(val._id!=linkId)
        return val;
    })
   
    console.log("filter link",filter_link);
    await users.findByIdAndUpdate(userId,{links:filter_link});
    user = await users.findOne({_id:userId});
    console.log("user ",user);

    if(user.links.length==0)
         return null;
     
      let Links=[];
        for (let index = 0; index < user.links.length; index++) {
           const link= await LinkContext.getLinkById(user.links[index])
           console.log(link);
           let url="http://localhost:3010/"+link.uniqueName;
           Links.push({id:link._id,link:url});
        }
        console.log("get links",Links);
       return Links;
       
    // for (let index = 0; index < user.links.length; index++) {
    //      if(user.links[index]._id==linkId)
    //        { 
            
    //       //  user =user.links.splice(index,1);
    //       //   console.log(user);
    //       //   user.save();
           
    //         return user;
    //        }
    //}
  
  }


}
export default UserContext;