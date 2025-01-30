// Initialization
const express =require('express')
const cors= require('cors')
const bodyParser=require('body-parser')
const sequelize=require('./database/db')



// Creating Server
const app=express()

//Creating a port
const port= 6000;

// Creating a middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.send("Welcome to the page")
})

app.get('/notice',(req,res)=>{
    res.send("This is notice")
})

//Running port
app.listen(port,()=>{
    console.log(`server starting at port......${port}`)
})