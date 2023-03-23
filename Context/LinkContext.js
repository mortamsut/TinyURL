
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
    },
    addTarget:async(targetParamName,name,value,uniqueName)=>{
      let link= await Link.findOne({uniqueName});
      let n,v;
      for(let i=0;i<link.targetValues.length;i++)
      {
        if(link.targetValues[i].name==name)
           n=name;
        if(link.targetValues[i].value==value)
           v=value;

      }
      console.log(n);
     if(!n&&!v)
     { link.targetValues.push({name,value});
      if(targetParamName)
      link.targetParamName = targetParamName
      //let addt=await Link.findByIdAndUpdate(link._id,{targetParamName });
      link.save();
    }
    else
       console.log("this name or value already exist")
  
       return link;
    }
}
export default LinkContext;