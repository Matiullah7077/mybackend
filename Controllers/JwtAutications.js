const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//load the secret key form .env file
const myKey = process.env.SECRET_KEY;

//Calling the functions
const app = express();
app.use(cookieParser());

//Creating JWT token

const jwtToken = (req, res) => {
  //Create a users payload for jwt token
  const payload = {
    username: "Matiullah4405",
    email: "matiullah9099@gmail.com",
  };
  try {
    //Creating the jwt token
    const token = jwt.sign(payload, myKey);

    //log for token
    console.log(token);

    //send token as cookie in the browser
    res.cookie("token", token);

    //Send responce
    res.send("JWT token created and sent as cookie 🍪");
  } catch (error) {
    res.send("JWT token was not created ❌");
  }
};

//Verfiy the JWT token
const Verfiy = (req, res) => {
  const token = req.cookies.token;

  //Conditions
  if (!token) return res.send("No token Found ");

  //Verfiying the token
  try {
    const decode = jwt.verify(token, myKey);
    res.send(`Your Token is Viled ✔ Welcome : ${decode.username}`);
  } catch (error) {
    res.send(`Sorry Your Token is invalid `);
  }
};

module.exports = { jwtToken, Verfiy };
