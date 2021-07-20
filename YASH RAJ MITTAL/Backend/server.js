const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
const notesRouter = require("./router/notesRouter");

const PORT = 6000;
const app = express();

app.use(express.json());
app.listen(PORT, () => {
    console.log("Server running at Port",PORT);
});

mongoose.connect('mongodb://localhost:27017/notes',{
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use('/users',userRouter);
app.use('/notes',notesRouter);
