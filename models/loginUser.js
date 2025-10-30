const { default: mongoose } = require('mongoose')
const mangoose = require('mongoose')

//Login users schma
const loginUserData = mongoose.Schema({
      email:{
        type:String,
        required: true ,
        unique:true,
    },
   password: {
  type: String,
  required: true,
}


})
const loginUsers =mongoose.model("loginUsers" , loginUserData);
module.exports = loginUsers;