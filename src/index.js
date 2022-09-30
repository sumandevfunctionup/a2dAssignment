const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const route=require('../src/routes/route')
const app=express();
app.use(bodyparser.json());
app.use('/',route);
mongoose.connect("mongodb+srv://sumandev:aBosU15RXTGZYkKq@cluster0.4du2i.mongodb.net/A2D?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>console.log("mongodb connected"))
.catch(error=>console.log(error))
app.listen(process.env.PORT||3000,function(){
    console.log("running on local port",process.env.PORT||3000)
})