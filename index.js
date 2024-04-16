const express = require("express");
const connectToDatabase = require("./DataBase/Connect");
const app = express();
require("dotenv").config();
const Port = process.env.PORT || 5000;
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");

app.use(express.json())
app.use(cors ({
    origin: "*"
}))

app.use("/data", userRoutes)

const ConnectToServer = async()=>{
    try{
        await connectToDatabase(process.env.MONGO_URL);
        app.listen(Port, ()=> console.log(`Server is running Successfully on ${Port} 😸`))
    }
    catch(err){
        console.log(err);
    }
}

ConnectToServer();
