const express=require("express");
const fs=require("fs");
const connect = require("./db.connect");
const  Short  = require("./data.model");
dotenv.config()
let app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("welcome")
})

app.post("/",async(req,res)=>{
     try{
        let data=await Short.create(req.body)
         return res.status(201).send({url:`https://fair-gray-jay-shoe.cyclic.app/${req.body.name}`})
     }catch(e){
        return res.status(401).send(e.message)
     }
})

app.get("/:id",async(req,res)=>{
    
    let item=await Short.findOne({name:req.params.id})
    if(item){
       return res.redirect(item.url)
    }
    res.send("<h1>sorry</h1>")

})

app.listen(8080,async()=>{
    console.log("listenning to 8080")
    await connect()
})