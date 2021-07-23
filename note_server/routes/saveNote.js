var cors=require('cors');
var qs = require('querystring')
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var mongoose = require('mongoose')
var notes = require('../schemas/noteSchema');
var cors = require('./cors');
var authenticate = require('../authenticate');
router.use(bodyParser.json())
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }));
router.route('/')
.options(cors.cors,(req,res,next)=>{
    res.status=200;
    // console.log(req.headers)
})
.get(cors.corsWithOptions,authenticate.verifyUser,(req, res) =>{
    console.log(req.headers)
    console.log(req.body)
    notes.find({user_id:req.user._id}).then((note,err)=>{
        if(err){
            res.statusCode=500;
            res.setHeader('content-type', 'application/json')
            console.log(err);
            res.send(err);
        }
        res.status=200;
        res.Header={
            "content-type": "application/json",
        }
        console.log(note)
        res.send(note);
    })
}).post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    notes.create(req.body)
    .then((note) =>{
        note.user_id=req.user._id;
        note.save().then(() => {
            res.status=200,
            res.Header={
            "content-type":"application/x-www-form-urlencoded",
            },
            res.send(note)
        }) 
        }
        )
})
module.exports=router;