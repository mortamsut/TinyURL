import users from '../models/Users.js';

const UserContext={

  getAllUsers: async()=>{
    let Users= await users.find();
    return Users;
  },
  getUserById: async(id)=>{
    let User= await users.findOne({_id:id}); 
    return User;
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
    let updateUse= await users.findByIdAndUpdate(id,user);
    updateUse.save();
    return updateUse;
  },
  deleteUser: async(id)=>{
    let deleteUse=await users.findByIdAndRemove(id);
    return deleteUse;
  }


}
export default UserContext;