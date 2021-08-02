const express = require('express');
const app = express();
const cors = require('cors');
const verify = require('./middleware/verify');
const register = require('./routeHandler/register');
const view = require('./routeHandler/view')
const add = require('./routeHandler/addNote')
const login = require('./routeHandler/login');
const deleteNote = require('./routeHandler/delete');
const path = require('path');
app.use(express.json());
app.use(cors());

// if(process.env.NODE_ENV === 'production'){
    // app.use(express.static('../frontend/build'));
    // app.post('*',(req,res)=>{
    //     res.sendFile(path.resolve(dirname,'build','index.html'));
    // })
    app.use(express.static(path.join(__dirname, '../frontend/build')));
//     app.use('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build'));
// })
// }


const port = process.env.PORT || 5000;

app.post('/login',login)
app.post("/register",register);
app.use(verify);
app.post("/view",view.view);
app.post('/addNotes',add);
app.post('/delete',deleteNote);
// app.post("/login",auth.login);

app.listen(port,()=>console.log("Server started on",port));


