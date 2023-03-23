import mongoose from "mongoose"

const UserSchema=mongoose.Schema({

    "name":{
        "type":String,
        "required":true
    },
    "email":String,
    "password":String,
    "links":[{"id":String}]
})
export default mongoose.model('users',UserSchema);

