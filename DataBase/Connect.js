const mongoose = require("mongoose")

const connectToDatabase = async(url)=>{
    await mongoose.connect((url))
    .then(()=> console.log("Database Connected Successfully 🥳"))
    .catch(()=> console.log("Error to connect the database 🥹"))
}

module.exports = connectToDatabase;