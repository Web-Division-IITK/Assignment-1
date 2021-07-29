const Users = require("../models/users");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//register
router.post('/register', async (req,res) => {
    try {
        const {username,password,email} = req.body;
        const user = await Users.findOne({username: username});
        if(user){
            return res.status(400).json({msg: "This User Already Exists"});
        }

        const HashPassword = await bcrypt.hash(password,10);
        const newUser = new Users({
            username: req.body.username,
            password: HashPassword,
            email: req.body.email
        });
        await newUser.save();
        res.json({msg: "User Registered Successfully"});
    }
    catch(err){
        res.status(500).json({msg: err.message});
    }
})

router.post('/login', async (req,res) => {
    try{
        const {username,password} = req.body;
        const user = await Users.findOne({username: username});
        if(!user){return res.status(400).json({msg: "User Does not exist"})};

        const isCheck = await bcrypt.compare(password,user.password);
        if(!isCheck) return res.status(400).json({msg: "Incorrect Password"});

        const payload = {id: user._id, username: user.username};
        const token = jwt.sign(payload,"1000-2000-3000",{expiresIn: 3600});

        res.json({token});
    }
    catch(err){
        res.status(500).json({msg: err.message});
    }
})

router.get('/verify', (req,res)=>{
    try {
        const token = req.header("Authorization");
        if(!token) return res.send(false);

        jwt.verify(token,"1000-2000-3000",(err,verified) => {
            if(err) return res.send(false);

            const user = Users.findById(verified.id);
            if(!user) return res.send(false);

            return res.send(true);
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
})

module.exports = router;