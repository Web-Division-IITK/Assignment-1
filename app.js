//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// mongoose part
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser: true, useUnifiedTopology: true});
const userSchema=new mongoose.Schema({
  email: String,
  password: Number
});
const User=new mongoose.model("users",userSchema);

//.........................................

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
var compose="";
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/home", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      homeStartingContent: homeStartingContent,
      posts: posts
      });
  });
});
app.get("/",function(req,res){
  res.render("first");});
  app.get("/register",function(req,res){
    res.render("register");});
    app.get("/login",function(req,res){
      res.render("login");});
app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact",{ contactContent: contactContent});
});
app.get("/compose",function(req,res){
  res.render("compose");
});
app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.post,
    content: req.body.title
  });


  post.save(function(err){
    if (!err){
        res.redirect("/home");
    }
  });
});
   app.post("/register",function(req,res){
         const newUser=new User({
           email:req.body.username,
           password:req.body.password
         });
         newUser.save(function(err){
           if(err){
             console.log(err);}
             else{
             res.redirect("/home");
             }
           
         })
   });
   app.post("/login",function(req,res){
     const username=req.body.username;
     const  password=req.body.password;
     User.findOne({email:username},function(err,founduser){
      if(err){console.log(err);}
      else{
        if(foundUser){
          if(founduser.password===password){
         res.render("secrets");
          }
          else{
                console.log("invalid username");
          }
        }
     }})
    
     
    });
app.listen(27017, function() {
  console.log("Server started on port 27017");
});
