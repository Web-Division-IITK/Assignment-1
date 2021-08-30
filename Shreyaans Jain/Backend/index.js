const http = require('http')
const path = require('path')
const port = 8000
const db = require('./config/mongoose')
const signup = require('./models/signup')
const notes = require('./models/notes')
const express = require('express')
const { notStrictEqual } = require('assert')
const { findByIdAndDelete } = require('./models/signup')
const app = express()
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../Frontend/views"));
console.log(path.join(__dirname, "../Frontend/views"))
// app.use(express.urlencoded());
app.use(express.static('../Frontend/assets'))
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    return res.render("index");
});
app.get("/index", (req, res) => {
    return res.render("index");
});
app.get("/login", (req, res) => {
    return res.render("login");
});
app.get("/notes", function(req, res){
    notes.find({},function(err,notes){
        if(err){
        console.log('Error in fetching contacts from db');
        return;
    }
    return res.render("notes",{
        notes: notes
    });
})
});
app.get("/sign", (req, res) => {
    return res.render("sign");
});
// app.post("/signup", function (req, res) {
//     signup.create({
//         name: req.body.name,
//         password: req.body.name,
//         email: req.body.name
//     }, function (err, newUser) {
//         if (err) {
//             console.log('Error in creating a user!')
//             return;
//         }
//         console.log('******', newUser);
//         return res.redirect('notes');

//     }
//     )
// })
app.post('/signup',(req,res)=>{
    var newUser= new signup(req.body);
    newUser.save()
    .then(item=>{
        console.log(item);
        return res.redirect('notes')
    })
    .catch(err=>{
        res.status(400).send("Error in creating a user")
    })
})
// app.post("/save", function (req, res) {
//     notes.create({
//         date: req.body.name,
//         notes: req.body.name
//     }, function (err, newNotes) {
//         if (err){
//             console.log('Error in creating a user!');
//         return;
//         }
//     console.log('******', newNotes);
//     return res.redirect('notes');
//     })

// })
app.post("/save", (req, res) => {
    var newNotes = new notes(req.body);
    newNotes.save()
    .then(item => {
    // res.send("item saved to database");
    
    // console.log('******', newNotes);
    console.log(item);
    return res.redirect('notes');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });
app.listen(port, () => {
    console.log('Server is listening on port', port)
})
app.get('/delete',function(req,res){
    let id=req.query.id
    notes.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting")
            return;
        }
        return res.redirect('back')
    })

})