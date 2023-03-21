import Linkcontext  from '../Context/LinkContext.js';
import UserContext from '../Context/UserContext.js';

import ip from 'ip'

const LinkController={

    getAllLinks: async(req,res)=>{ 
      const userId = req.id;
      const user=UserContext.getUserById(userId);
      console.log("get link controller");
      const Links=await Linkcontext.getLinks(user);
     
      res.send(Links);
    },
    getLinkById: async(req,res)=>{
     const Link= await Linkcontext.getLinkById(req.params.id);
     res.send(Link);
    },
    addLink: async(req,res)=>{
      // const userid=req.id;
      // console.log("link controller id user: ",userid);
      const {originalUrl,uniqueName}=req.body;
      const unique= await Linkcontext.findByUniqueName(uniqueName);
      console.log('addLink', unique)
      if(!unique){
        const newLink=await Linkcontext.addLink({originalUrl,uniqueName});
        const usr=UserContext.addUserLink(userid,newLink._id);
        let tinyLink="http://localhost:3010/"+uniqueName;
       res.send(tinyLink);
    }else {
      res.status(401).send("The same name already exists");
  }
    },
    updateLink: async(req,res)=>{
      console.log("update controller",req.params.id);
      console.log("body controller",req.body.originalUrl);
       const {id}=req.params;
       const{originalUrl,uniqueName}=req.body;
       let link=await Linkcontext.getLinkById(id);
       if(link.uniqueName==uniqueName)
        {
          const updateLink=await Linkcontext.updateLink(id,{originalUrl,uniqueName});
          res.send(updateLink);
          return;
        }
       const unique= await Linkcontext.findByUniqueName(uniqueName);
       if(!unique){
       const updateLink=await Linkcontext.updateLink(id,{originalUrl,uniqueName});
       res.send(updateLink);}
       else res.send("The same name already exists");
    },
    deleteLink: async(req,res)=>{
      console.log("delete link controler",req.params.id);
      const {id}=req.params;
      const deleted=await Linkcontext.deleteLink(id);
      res.send(deleted);
    },
    redirect: async(req,res)=>{
      //לבנתיים
      if(req.params.uniqueName == "favicon.ico"){
        res.send('ok')
        return;
      }
      // ,Date.now,"1.2.3"
      
     
      console.log("redirect");
      let original= await Linkcontext.findByUniqueName(req.params.uniqueName);
      console.log("ip addres",ip.address());
      
      console.log("targetName",original.originalUrl);
      res.redirect(301,original.originalUrl);
      let targetn=original.targetParamName;
      console.log("targetParam-",req.query.targetn);
     let click= await Linkcontext.addClick(req.params.uniqueName,ip.address(),req.query[targetn]);
    console.log(click);
    },
    addTarget:async(req,res)=>{
      const {uniqueName}=req.params;
      const{targetName,name,value}=req.body;
      const link=await Linkcontext.addTarget(targetName,name,value,uniqueName);      
      let tiny="http://localhost:3010/"+uniqueName+'?'+link.targetParamName+'='+value;
      res.send(tiny);
    }    
}
export default LinkController;