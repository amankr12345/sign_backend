const mongoose=require('mongoose')

const signUpSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('signUp_In',signUpSchema)