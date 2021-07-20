const express = require('express');
const app = express();
let auth = require('../auth/reg');
app.use(express.json());
app.post("/register",auth.register);
app.post("/login",auth.login);
// app.use('/',function(req,res){
//     res.json('Hello world');
// });
app.listen(3000);


