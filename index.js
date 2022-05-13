const express= require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const authRoute=require('./routes/auth')
const dotenv=require('dotenv')
const Port=3030
const app=express()
app.get('/',()=>console.log('runnimg on backend server'))

app.listen(Port,()=>{
    console.log(`running os server ${Port}`)
})

dotenv.config()
mongoose.connect(process.env.DB_CONNECT,{UseNewUrlParser:true},()=>{
    console.log( 'DB CONNECTED')
})

app.use(express.json(),cors())

app.use('/app',authRoute)