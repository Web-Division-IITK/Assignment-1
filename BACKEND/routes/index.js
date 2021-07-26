const express = require('express');
// const actions=require('../methods/actions');
const router=express.Router();
router.get('/',(req,res)=>{
    res.send('Hello World!');
})
router.get('/dashboard',(req,res)=>{
    res.send('Dashboard');
})   

router.post('/adduser', actions.addNew)
router.post('/autheticate', actions.autheticate)
router.get('/getinfo',actions.getinfo)
module.exports=router