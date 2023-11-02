const express = require('express')
const env = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const path = require("path");
const cors = require("cors");
const authRoutes = require('./routes/auth')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

env.config();
const connection_url=`mongodb+srv://mankashkadian:${process.env.PASSWORD}@cluster0.zhinm2n.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(connection_url).then(() => {
    console.log("database connected");
  }).catch((error)=> console.error(error))

app.use('/api',authRoutes)
app.use('/api',require('./routes/contact'))
app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT}`)
})