//Require the dependencies
const mongoose = require('mongoose')
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

//Create the Mongos DB Conection
const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MogosDB_Url)
        console.log("Database conection Successfuly 👍 ")

    } catch (error) {

        console.error("Filed to connect with database ❌", error.message)
    }

}
module.exports = connectDB;