var express = require('express');
var router = express.Router();
// import app from '../firebase';
// import auth from '../firebase';
// import createUser from './create-new-user';

var createUser =require('../routes/create-new-user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//Create new user
router.get('/create-user',function (req,res,next) {
  var success=createUser(
      req.headers['email'],
      req.headers['password']
  );

  res.send(success);
});

module.exports = router;
