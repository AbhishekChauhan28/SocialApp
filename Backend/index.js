const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require('./router/user');
const dotenv = require("dotenv");
const PostRouter = require('./router/Post')
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGODB).then(() => 
console.log("DB Connection successfull")).catch(() => {
    console.log("Some error occured")
})
app.use(cors())
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/post', PostRouter)


app.listen(5000, () => {
    console.log('server is running')
})