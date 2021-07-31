const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var users = require('../schemas/users')
var passport = require('passport')
router.use(bodyParser.json())
var authenticate=require('../authenticate');
var cors = require('./cors')
/* GET users listing. */
router.route('/').options((req,res)=>{
  res.statusCode=200;
}).get(function (req, res, next) {
  res.send('respond with a resource');
}).post(cors.corsWithOptions,(req, res, next) => {
  if(req.body.username&&req.body.password){
    users.findOne({username:req.body.username}).then((user)=>{
      if(user){
        res.statusCode=401;
        res.setHeader('Content-Type', 'application/json');
        res.send({err:'try a different username'});
      }
      else{
        users.create(req.body).then((user,err) => {
          if(err) {
            res.statusCode=500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err:err})
          }
          else{
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.send(user);
          }
        })
      }
    })
  }
  else{
    res.statusCode=500;
    res.setHeader('Content-Type', 'application/json');
    res.send({err:"username and password required"})
  }
})
router.route('/login').post(cors.corsWithOptions,(req, res,next) => {
  users.findOne({username:req.body.username}).then((user,err)=>{
    if(err){
      res.statusCode=401;
      res.setHeader('Content-Type','application/json');
      res.send(err);
    }
    else if(!user){ 
      res.statusCode=401;
      res.setHeader('Content-Type','application/json');
      res.send({err:"user not found"})
    }
    else{
      if(user.password!==req.body.password){
        res.statusCode=401;
        res.setHeader('Content-Type','application/json');
        res.send({err:"incorrect password"})
      }
      else{
        var token=authenticate.getToken({_id:user._id})
          res.statusCode=200;
          res.Header={'Content-Type':'application/json'};
          res.send({success:true,token:token})
        
      }
    }
  })
})
module.exports = router;
