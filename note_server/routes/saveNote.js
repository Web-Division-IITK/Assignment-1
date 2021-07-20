var cors=require('cors');
var qs = require('querystring')
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var mongoose = require('mongoose')
var notes = require('../schemas/noteSchema');
var cors = require('./cors');
router.use(bodyParser.json())
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }));
router.route('/')
.options(cors.cors,(req,res,next)=>{
    res.status=200;
    
})
.get(cors.cors,(req, res) =>{
    
    notes.find({}).then((note)=>{
        res.status=200;
        res.Header={
            "content-type": "application/json",
        }
        console.log(note)
        res.send(note);
    })
}).post(cors.cors,(req,res,next) => {
    notes.create(req.body)
    .then((note) =>{ 
        res.status=200,
        res.Header={
            "content-type":"application/x-www-form-urlencoded",
        },
        res.send(note)
        }
        )
})
module.exports=router;