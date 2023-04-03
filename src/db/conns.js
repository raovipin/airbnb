const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://raovipin2008:2000%40Yadav@cluster0.mwbi7fy.mongodb.net/Airbnb`)
.then(()=>console.log('connection has been made'))
.catch(()=>console.log('No connection'))

// const DB= `mongodb+srv://raovipin2008:2000@Yadav@cluster0.mwbi7fy.mongodb.net/airbnb?retryWrites=true&w=majority`
// mongoose.connect(DB,{useNewUrlParser:true,
// useCreateIndex:true,
// useUnifiedTopology:true,
// useFindAndModify:false
// })
// .then(()=>console.log('connection has been made'))
// .catch(()=>console.log('No connection'))




