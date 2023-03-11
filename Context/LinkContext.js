
import Link from '../models/LinksModel.js'

const LinkContext={
    getLinks: async()=>{
        console.log("get link context");
        let links= await Link.find();
     
    return links;
    },
    getLinkById: async(id)=>{
        let link= await Link.findOne({_id:id}); 
        return link;
      
    },
   
    addLink: async(link)=>{
       console.log("post link");
       const newLink=new Link({originalUrl:link.originalUrl,
        uniqueName:link.uniqueName});
       newLink.save();
       return newLink;
    },
    updateLink: async(id,link)=>{ 
        console.log("update context",id);
        console.log("body context",link);
      let update=await Link.findByIdAndUpdate(id,{originalUrl:link.originalUrl,
        uniqueName:link.uniqueName});
      update.save();
      return update; 
    },
    deleteLink: async(id)=>{
        console.log("delete link"+id);
       let deleted=await Link.findByIdAndDelete(id);
       return deleted;
    },
    findByUniqueName: async(uniqueName)=>{
        const unique=await Link.findOne({uniqueName});
        console.log("the name",unique);
        return unique;
    },
   
    addClick: async(uniqueName,ip,t)=>{
      let link= await Link.findOne({uniqueName});
      console.log("before",link);
      let insertedAt= new Date();
      console.log("ip-",ip);
      let ipAddress=ip;
      let targetParamValue=t;
      console.log("targetParamValue-",t);
      link.clicks.push({insertedAt,ipAddress,targetParamValue});
      console.log("after",link);
      link.save();
     return link;
    }
}
export default LinkContext;