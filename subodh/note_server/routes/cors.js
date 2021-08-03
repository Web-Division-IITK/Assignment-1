const express = require('express');
const cors = require('cors');
const app = express();

const whitelist =['http://localhost:3000','http://localhost:3100','http://3.142.94.241:3100','https://yournoteserver.herokuapp.com/'];

const corsOptionsDelegate = (req,callback)=>{
    var corOptions
    if(whitelist.indexOf(req.header('Origin')!==-1)){
        corOptions = {origin:true}
    }
    else{
        corOptions = {origin:false}
    }
    callback(null, corOptions);
}

exports.cors=cors();
exports.corsWithOptions=cors(corsOptionsDelegate);