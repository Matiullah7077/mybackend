//Require The Dependencies
const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const dataBase_Conrction = require('./config/db')

//Import the Routes for Routes/controllerroutes.js
const routes = require('./Routes/controllerRoutes')
//Import the user from userModels.js and login User from loginUser.js
const userModels = require('./models/userModel')
const loginUser = require('./models/loginUser')

//Calling the express Functions
const app = express();
//Midleweras
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//Creating Localhost server data
const port = 3000
const hostName = "127.0.0.1";
//Register route for reciving registery data from Frontend
app.post('/register' , async (req  , res) =>{
  try {
      const {username , email , password} = req.body;
    //Ckeck if emails already exist
    const existEmail = await userModels.findOne({email})
    if(existEmail){
      return res.json({success:false , message:"email already exist"})
    }

  
    //Creating the plain password to Hash
    const hashPassword = await bcrypt.hash(password ,10)

    const newUser = new userModels({username , email , password:hashPassword,})
    await newUser.save()

res.json({success:true, message: "User registered successfully!" });
  } catch (error) {
   res.send("Feild to recive Data from Frontend ")
  }


})
//Login Route for recving dat from Frontend
app.post('/login' , async(req , res) =>{
  try {
    const {email , password} = req.body;

  //Fint user Emils for login 
  const user = await userModels.findOne({email})
  if(!user) {
    return res.json({success:false , message:"User not found"})
  }
   //Compire password of login users
   const passwordMatched = await bcrypt.compare(password , user.password)
   if(!passwordMatched){
    return res.json({success:false , massage:"Invaild Password"});
    
   }

   //If every thongs Matched then
   res.json({
    success:true,
    message:"User Login Successful",
    user:{username:user.usermane , email:user.email},
   })

  

  } catch (error) {
    res.send("Feild to login user")
  }
})
//Home route to use the all express routes
app.use('/' , routes)

//Calling the Connection Function
dataBase_Conrction();

//start The server
app.listen(port ,() =>{
    
    console.log(`Server is Runing on http://${hostName}:${port}`)
})