var express = require('express');
var router = express.Router();
var authenticate = require('./authentication/verify-user');
var createUser = require('./authentication/create-new-user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Create New user
router.get('/create-user', function(req,res){
  var success = createUser(req.headers['email'],
                           req.headers['password'],
                           req.headers['nickname'] );
                    
  res.send(success);
});

//Authenticate existing user
router.get('/verify', function(req, res){
  const user = req.headers['user'];
  const password = req.headers['password'];
  var validCred = authenticate(user, password);
  if(validCred){
    res.send("yes");
  }
  else{
    res.send("no");
  }
});
module.exports = router;
