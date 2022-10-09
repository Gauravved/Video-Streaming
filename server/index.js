const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connection Successful");
}).catch((error)=>{
    console.log(error.message);
})

const server = http.createServer(app);
server.listen(process.env.PORT, ()=>{
    console.log("Server Listening to: "+process.env.PORT);
});
app.use('/api/auth',userRoute);