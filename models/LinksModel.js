import mongoose from "mongoose";

const LinkSchema=mongoose.Schema({
  
    "originalUrl":String,
    "uniqueName":String, 
    "clicks":[{
    
         "insertedAt":Date,
         "ipAddress":String,
         "targetParamValue":String,
    }],
    "targetParamName":{type:String,default:'t'}
})
export default mongoose.model('Link',LinkSchema);