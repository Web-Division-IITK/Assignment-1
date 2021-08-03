//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
//const ejs = require("ejs");
const cors=require('cors');
const app = express();
require('dotenv').config()
app.use(cors());
//const notes=require("./models/notes.js");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./routes/links.js'));
const mongoose=require("mongoose");
const DB='mongodb+srv://hero:mittal@cluster0.lrivu.mongodb.net/note_keeper?retryWrites=true&w=majority'
mongoose.connect(DB, {useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true,useFindAndModify:false}).then(()=>{
    console.log("connection done")
}).catch((err)=>{
    console.log(err);
});;
app.listen(process.env.PORT||9002, function() {
    console.log("Server started on port 9002");
    });
//   notes.find({},(err,notes)=>{
//         const note=notes;                   
//   })