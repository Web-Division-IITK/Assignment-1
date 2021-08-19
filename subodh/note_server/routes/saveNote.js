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
router.route('/:noteId').options(cors.corsWithOptions,(req, res) => {res.statusCode=200}).put(cors.corsWithOptions,authenticate.verifyUser,(req, res,next)=>{
    console.log(req.body)
    notes.findByIdAndUpdate(req.params.noteId,req.body).then((note)=>{
        if(note){
        notes.find({user_id:req.user._id}).then((notes)=>{
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.send(notes);
        })}
    },(err)=>next(err)).catch((err)=>next(err))
}).delete(cors.corsWithOptions,authenticate.verifyUser,(req, res)=>{
    notes.findOneAndDelete({_id:req.params.noteId}).then((results)=>{
        notes.find({user_id:req.user._id}).then((results)=>{
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.send(results);
        })
    })
.catch((err)=>{ res.statusCode=500;
                res.setHeader('Content-Type', 'text/plain');
                res.send({err:err})

})
});
router.route('/important').options(cors.corsWithOptions,(req,res)=>{res.statusCode=200}).get(cors.corsWithOptions,authenticate.verifyUser,(req, res)=>{
    notes.find({user_id:req.user._id,important:true}).then((notes)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.send(notes)
    });
})
router.route('/:noteId/important').options(cors.corsWithOptions,(req,res)=>{res.statusCode=200})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res)=>{
    notes.findByIdAndUpdate(req.params.noteId,{important:true}).then((note)=>{
        if(note){
            notes.find({user_id:req.user._id,important:true}).then((result)=>{ 
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.send(result)
            })
        }
    })
}).delete(cors.corsWithOptions,authenticate.verifyUser,(req, res)=>{
    notes.findByIdAndUpdate(req.params.noteId,{important:false}).then((result)=>{ if(result){
        notes.find({user_id:req.user._id,important:true}).then((result)=>{ 
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.send(result)
        })
        }})
})
module.exports=router;