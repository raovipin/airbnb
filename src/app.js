const express = require('express')
const app =express()
const path = require('path')
const port = 3000;
const secretkey ="secretkey"
const hbs = require('hbs')
const jwt = require('jsonwebtoken')
const ejs = require('ejs')
const multer =require('multer')
const mongoose =require('mongoose')
require('./db/conns') //to require connection database

const Register= require('./models/register')
const mymodel= require('./models/host');
const async = require('hbs/lib/async');
// const imgdetail= require('./models/testimg')

const static_path = path.join(__dirname,  '../public')

const template_path=path.join(__dirname,'../templates/views')

const partials_path=path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs' ,'ejs')

mongoose.set('strictQuery', true);
// app.set('views',template_path)
// app.set('templates','views',partials_path)
app.set('views',template_path)
hbs.registerPartials(partials_path)
app.use(express.static(static_path))

// hbs.registerPartials(partials_path)

// app.use(express.static(static_path))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// app.get('/',(req,res)=>{
//     res.send('Hello from Home page')
// })

app.get('/',async (req,res)=>{
  const result = await mymodel.find()
  console.log(result);
  res.render('index.ejs',{x:result})

    // mymodel.find({})
    // .then((x)=>{
    //     res.render('index.ejs', [x])
    //     console.log(x)
    // })
    // .catch((y)=>{
    //     console.log(y)
    // })
    // res.render('index')
})
// app.get('/bookingpage:id', function (req, res) {
//     console.log(req.params['id']);
//     res.send();
// });
app.get('/login',(req,res)=>{
    res.render('login.ejs')
    // res.render('index')
})

app.post('/login',async(req,res)=>{
    
    try{
        const email =req.body.email
        const password = req.body.password
        // console.log(email,password);

        const useremail= await Register.findOne({email:email})
        // res.send(useremail) 
        // res.send(useremail.password) 

        if(useremail.password ===password){
    
            res.status(201).redirect('/')


            jwt.sign({Register},secretkey,{expiresIn:'300s'},(err,token)=>{
                res.json({
               token
                })
                console.log(token)
            })
           
       
        }
        else{
            res.send('<h1 style="text-align: center ; color:red ; font-size:3rem" >Password is not matching!!</h1>')
        }

    }catch (e) {
        console.log(e);
       
        // res.status(404).render('index')
    }

})

app.get('/register',(req,res)=>{
    // res.send('hello from register')
    // res.redirect('register')
    res.render('register.ejs')
})



app.post('/register',async(req,res)=>{
    try {
        // console.log(req.body.firstname)
        // req.setEncoding(req.body.firstname)   //this is used to show our data to forntend

        const password =req.body.password
        const cnfpassword = req.body.cnfpassword
        if(password===cnfpassword){
            const registerstudent = new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:req.body.password,
                cnfpassword:req.body.cnfpassword,
                gender:req.body.gender
              
            })
            const registerresult = await registerstudent.save()
            res.status(201).render('login.ejs')
        }
    } catch (e) {
        console.log(e)
        res.send('error')
        // res.status(404).render('index')
    }

    
})




let storage = multer.diskStorage({
    destination:'./public/images', //directory (folder) setting
    filename:(req, file, cb)=>{
        cb(null, Date.now()+file.originalname) // file name setting
    }
})

//Upload Setting
let upload = multer({
   storage: storage,
   fileFilter:(req, file, cb)=>{
    if(
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/gif'

    ){
        cb(null, true)
    }
    else{
        cb(null, false);
        cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
    }
   }
})




//mULTIPLE IMAGE UPLODING
app.post('/multiplepost', upload.array('multiple_input', 3), (req, res)=>{
    req.files.forEach((singale_image)=>{
        mymodel.create({Picture: singale_image.filename,propertyname:req.body.propertyname,Description:req.body.Description,
            location:req.body.location,area:req.body.area,date:req.body.date,price:req.body.price})
        .then((x)=>{
            res.redirect('/')
        })
        .catch((y)=>{
            console.log(y)
        })
    })
})

app.get('/multiplepost', (req, res)=>{
    res.render('host.ejs')
})




//Booking page
app.get('/book',(req,res)=>{
    res.render('bookingpage.ejs')
})
app.get('/cnfbooking',(req,res)=>{
    res.render('cnfbooking.ejs')
})



app.listen(port,()=>{
    console.log('server started')
})