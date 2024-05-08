const express=require("express");
const fs=require("fs");
const connect = require("./db.connect");
const  Short  = require("./data.model");
const cors=require("cors")
let app=express()
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.sendFile("./home.html",{root:__dirname})
})

app.post("/",async(req,res)=>{
     try{
        let data=await Short.create(req.body)
         return res.status(201).send({url:`https://shorturl-pv3n.onrender.com/${req.body.name}`})
     }catch(e){
        return res.status(401).send(e.message)
     }
})

app.get("/:id",async(req,res)=>{
    
   try{
    let item=await Short.findOne({name:req.params.id})
    if(item){
       return res.redirect(item.url)
    }
    res.send("<h1>sorry</h1>")
   }catch(e){
    return res.status(401).send({url:e.message})
   }

})

app.listen(8080,async()=>{
    console.log("listenning to 8080")
    await connect()
})
