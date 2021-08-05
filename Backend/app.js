const express= require('express')
const mongoose= require('mongoose')
const url='mongodb+srv://sahilsingh20:bc131yx@newcluster.ie6r5.mongodb.net/test'
const bodyParser = require("body-parser")


const app=express()

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false})
const con=mongoose.connection

con.on('open',()=>{
    console.log('connected to mongoDB')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


const alienRouter = require('./routes/aliens')
app.use('/aliens',alienRouter)

// app.listen(9000,()=>{
//     console.log('server is running')
// })

const PORT=process.env.PORT || 3000;

app.listen(PORT,console.log('Server running on port '+PORT))