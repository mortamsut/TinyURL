import mongoose from "mongoose";

const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_URI);

};

mongoose.connection.on("connected",()=>{
    console.log("mongo is connected");
});

mongoose.set('toJSON',{
    virtuals:true,
    transform:(doc,converted)=>{
        delete converted._id;
    }
});
export default connectDB;