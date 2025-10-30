//dependencies
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

const plainPassword = "Matiullah9099";
const salt_Round = 10;

//Plain Password to Hash
const homeRout = async (req, res) => {
    //Plain Password into Hash
    try {
        const hashPassword = await bcrypt.hash(plainPassword, salt_Round);

        //log for devlper testing
        console.log("Generated Password is : ", hashPassword);

        //Conditions
        if (hashPassword) {
            res.send("Hash Password generated successfuly");
        } else {
            res.send("Error to generated password");
        }
    } catch (error) {
        console.log("Field to generated hash Password", error.message);
    }
};
// Route for compire password
const isMatch = async (req, res) => {
    //Hash Password
    const hash = "$2b$10$Blww8vlZgkvSJCQBJ5mqDe8p8QBYyn6YB2m3HKtz6c/WBZFd/ZKmC";

    try {
        const compirePassowrd = await bcrypt.compare(plainPassword, hash);
        //Log for devolper testing
        console.log("Password Matched successfuly :", compirePassowrd);
            //conditions
        if (compirePassowrd) {
            res.send("Password Matched Successfuly");
        } else {
            res.send("Password did not matched");
        }
    } catch (error) {
        console.log("Passowrd Is not Matched :");
    }
};

module.exports = { isMatch, homeRout };
