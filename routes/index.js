const express = require('express')
const User = require("../models/user")
const bcrypt = require("bcryptjs")


const router = express.Router()

//POST MENTOR DETAILS API CRETETING
router.post("/register", async (req,res)=>{
    try{
        const {userName, password} = req.body;
        // const credentials = new User(req.body);
        const user = await User.findOne({userName})
        if(!user){
            //Hash the password
            const hasedPassword = await bcrypt.hash(password,10);
            const credentials = new User({userName,password:hasedPassword})
            await credentials.save();
            res.status(200).send(credentials)
        }
        else{
            return res.status(400).send("UserName already exisits")
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

//Login
router.post("/login", async(req,res)=>{
    try{
        const {userName, password} = req.body;
        const user = await User.findOne({userName})
        if(!user){
            return res.status(404).send("User Not Exists",userName)
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;