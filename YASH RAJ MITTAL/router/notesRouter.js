const Notes = require("../models/notesMod");
const express = require("express");
const router = express.Router();
const auth = require("../auth");

router.route('/')
    .get(auth , async (req,res) => {
        try {
            const notes = await Notes.find({user_id: req.user.id});
            res.json(notes);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    })
    .post(auth , async (req,res) => {
        try {
            const {title,content,date} = req.body;

            const newNotes = new Notes({
                title,content,date,user_id: req.user.id,name: req.user.username
            });
            await newNotes.save();
            res.json({msg: "Note Created"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    })

router.route('/:id')
    .delete(auth , async(req,res)=>{
        try {
            await Notes.findByIdAndDelete(req.params.id);
            res.json({msg: "Deleted The Note"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    })
    .put(auth , async(req,res)=>{
        try {
            let {title,content,date} = req.body;
            await Notes.findOneAndUpdate({_id: req.params.id},{title,content,date});
            res.json({msg: "Updated The Note"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    })
    .get(auth , async (req,res) => {
        try {
            const notes = await Notes.findById(req.params.id);
            res.json(notes);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    })


module.exports = router;