const express = require('express')
const app = express();
require('dotenv').config();      // 
const main =  require('./config/db.js')
const cookieParser =  require('cookie-parser');
const authRouter = require("./routes/userAuth.js");
const redisClient = require('./config/redis.js');
const problemRouter = require("./routes/problemCreator.js");
const submitRouter = require("./routes/submit.js")
const aiRouter = require("./routes/aiChatting.js")
const videoRouter = require("./routes/videoCreator.js");
const cors = require('cors')

// console.log("Hello")

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true 
}))

app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);


const InitalizeConnection = async ()=>{
    try{

        await Promise.all([main(),redisClient.connect()]);
        console.log("DB Connected");
        
        app.listen(process.env.PORT, ()=>{             
            console.log("Server listening at port number: "+ process.env.PORT);
        })

    }
    catch(err){
        console.log("Error: "+err);
    }
}


InitalizeConnection();

