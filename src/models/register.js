const mongoose = require('mongoose')

const studentsSchema= new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    gender:{type:String,required:true},
    password:{type:String,required:true},
    cnfpassword:{type:String,required:true}


})
const Register=new mongoose.model('Sign up',studentsSchema)


module.exports=Register

