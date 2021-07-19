var cors=require('cors');
var qs = require('querystring')
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var mongoose = require('mongoose')
var notes = require('../schemas/noteSchema');
var cors = require('./cors');
// const url="http://localhost:27017/";
router.use(bodyParser.json())
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }));
// const connect = mongoose.connect(url);
// connect.then((db) => {console.log('connected successfully to database')},(err)=>{return err}).catch((error)=>{next(error)})
router.route('/')
.options(cors.cors,(req,res,next)=>{
    // if(req.header.origin='http://localhost:3000'){
    //     res.status=200;
    //     res.header={
    //         "Access-Control-Allow-Origin":"http://localhost:3000/",
    //         "content-type":"application/json"
    //     }
    //     res.send('sdfv')
    // }
    res.Header={
        "Access-Control-Allow-Origin":"http://localhost:3000/",
        "Vary":"Origin"
    }
})
.get(cors.cors,(req, res) =>{
    res.Header={
        "Access-Control-Allow-Origin":"http://localhost:3000/",
        "Vary":"Origin"
    }
    notes.find({}).then((note)=>{
        res.status=200;
        res.Header={
            "content-type": "application/json",
            "Access-Control-Allow-Origin":"http://localhost:3000/",
            "Vary":"Origin"
        }
        res.send(note)
    })
}).post(cors.cors,(req,res,next) => {
    // console.log(qs.parse(req.body));
    notes.create(req.body)
    .then((note) =>{ 
        // console.log(note)
        res.status=200,
        res.Header={
            "content-type":"application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin":"http://localhost:3000/",
            "Vary":"Origin"
        },
        res.send(note)
        }
        )
})
module.exports=router;