import mongoose from "mongoose";

const LinkSchema=mongoose.Schema({
  
    "originalUrl":String,
    "uniqueName":String,
    "targetParamName":{type:String,default:'t'},
    "targetValues":[{
        "name":String,
        "value":String,
    }], 
    "clicks":[{
    
         "insertedAt":Date,
         "ipAddress":String,
         "targetParamValue":String,
    }],
 
})
export default mongoose.model('Link',LinkSchema);