const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/index')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config();

const app = express()
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully")
}).catch((error)=>{
    console.log('MongoDB Connection Failed')
})

//Checking for which URI
console.log(`MONGO_URI - ${process.env.MONGO_URI}`)

app.use('/API', routes)

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server Running on Port - ${PORT}`)
}) 