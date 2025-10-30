const express = require("express")
const router = express.Router();
const {isMatch ,homeRout} = require("../Controllers/passwordBcrypt")
const {jwtToken , Verfiy} = require("../Controllers/JwtAutications")

//Route to Hash the plain  password 
router.get('/' ,homeRout)

//Route to chech the result of compire Password 
router.get('/check' , isMatch)

//Create and Verfiy JWT token Routes
router.get('/token' , jwtToken)
//Verfiying Token
router.get('/verfiy' , Verfiy)

//Expotrt the router
module.exports = router