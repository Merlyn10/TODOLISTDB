const express=require("express")
const https=require("https")
const mongoose=require("mongoose")
const body=require("body-parser")
const app=express()
app.use(express.static("public"))
app.use(body.urlencoded({extended:true}))
app.set('view engine','ejs')

mongoose.connect("mongodb://127.0.0.1:27017/TODOLISTDB",{useNewUrlParser:true})

//schema
const todoschema=new mongoose.Schema({task:String})
//model
const todomodel=mongoose.model("tasks",todoschema)

//const t1=new todomodel({task:"Gaming"})
//const t2=new todomodel({task:"skipping"})
//t1.save()
//t2.save()
var lists=[]

app.get("/",function(req,res){

  todomodel.find().then((result)=>{
    res.render('index',{tasks:result})
  }).catch((err)=>{
    console.log(err)
  });
 
})
app.post("/delete",function(req,res){
  var item=req.body.checkbox
  todomodel.deleteOne({_id:item}).then((result)=>{
    res.redirect("/")
  }).catch((err)=>{
    console.log(err)
  });
})



app.post("/",function(req,res){
 var todotask=req.body.task
 // lists.push(task)
 const task=new todomodel({task:todotask})
 task.save()
res.redirect("/")
})

app.listen(process.env.PORT ||3000,function(){
    console.log("server is up")
})