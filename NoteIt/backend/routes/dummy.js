var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/demo', function(req, res){
  res.send('This is a demo!');
})
module.exports = router;
