// const mongoose = require('mongoose')

// const PropertySchema= new mongoose.Schema({

//     propertyname:{type:String ,trim:true ,required:true},
//     location:{type:String ,trim:true ,required:true},
//     area:{type:String ,trim:true ,required:true},
//     date:{type:Date ,trim:true ,required:true},
//     price:{type:Number ,trim:true },
//     ownername:{type:String ,trim:true,required:true },
//    images:String,

   
// })
// mongoose.set('strictQuery', true);
// const Propertydetail=new mongoose.model('Hosting',PropertySchema)


// module.exports=Propertydetail;




let express= require('express');
let multer = require('multer')
let mongoose = require('mongoose')
let app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://127.0.0.1:27017/image').then(()=>console.log('db has been connected'))
let myschema = mongoose.Schema({
    Picture : String,
    propertyname:{type:String,trim:true},
    location:{type:String,trim:true},
    area:{type:String,trim:true},
    date:{type:String,trim:true},
    price:{type:String,trim:true},
    Description:{type:String,trim:true}
    
})
let mymodel = mongoose.model('image', myschema)

module.exports=mymodel;