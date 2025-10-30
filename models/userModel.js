const mongoose = require('mongoose')


//Create a user Schema
const userSchema = mongoose.Schema({
    username :{
        type: String ,
        required: true },
    email:{
        type:String,
        required: true ,
        unique:true,
    },
    password:{
        type : String,
        unique:true,
    }
})
//Create modles
const User = mongoose.model("User" , userSchema)
module.exports = User;