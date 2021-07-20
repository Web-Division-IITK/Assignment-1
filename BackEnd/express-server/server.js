const express = require("express");
const app = express();


app.listen(3000, function() {                   //argument==> port number from which this app should be listened
    console.log("server is at port 3000");
});                       