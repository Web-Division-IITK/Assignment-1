const express = require('express');
const app = express();
const cors = require('cors');
const verify = require('./middleware/verify');
const register = require('./routeHandler/register');
const view = require('./routeHandler/view')
const add = require('./routeHandler/addNote')
const login = require('./routeHandler/login');
const deleteNote = require('./routeHandler/delete');
app.use(express.json());
app.use(cors());

app.post('/login',login)
app.post("/register",register);
app.use(verify);
app.post("/view",view.view);
app.post('/addNotes',add);
app.post('/delete',deleteNote);
// app.post("/login",auth.login);

app.listen(5000);


