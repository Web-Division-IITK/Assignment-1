const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 


let itemAdded = [];
let workItems = [];

app.get("/", function(req, res){
    let today = new Date();
    let options = {
        weekday: 'long', 
        month: 'long', 
        day: 'numeric'
    }
    
    let day = today.toLocaleDateString("en-IN", options);
    
    res.render("list", {
        listTitle: day,
        itemName: itemAdded
    });
});

app.post("/work", function(req, res){
    let newItem = req.body.item;
    workItems.push(newItem);
    res.redirect("/work");
});

app.post("/", function(req, res){
    let newItem = req.body.item;
    console.log(req.body.list);
    if(req.body.list === "work"){
        workItems.push(newItem);
        res.redirect("/work");

    } else {
    itemAdded.push(newItem);
    res.redirect("/");
    }
    
    
    
});

app.get("/work", function(req, res){
    res.render("list", {
        listTitle: "work",
        itemName: workItems
    });
});

app.listen(3000, function(){
    console.log("server running at port: 3000");
});
