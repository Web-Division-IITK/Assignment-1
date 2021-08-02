const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
const notesRouter = require("./router/notesRouter");
const cors = require('cors');

const PORT = 6000;
const app = express();

app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
    console.log("Server running at Port",PORT);
});

mongoose.connect('mongodb+srv://Yash:chigiwiggi@notesdb.zxlzq.mongodb.net/notes?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use('/users',userRouter);
app.use('/notes',notesRouter);
