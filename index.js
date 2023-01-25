const express=require("express");
const fs=require("fs")
let app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.sendFile("./home.html",{root:__dirname})
})

app.post("/",async(req,res)=>{
    let data=await fs.readFileSync("./db.json","utf-8",(err)=>console.log(err))
    data=JSON.parse(data)
   
    let arr=data.data.filter((e)=>e.name==req.body.name)
    if(arr.length>0){
        return res.status(201).send({url:"can not use this name "})
    }
    data.data.push({
        url:req.body.url,
        name:req.body.name
    })
    fs.writeFileSync("./db.json",JSON.stringify(data))
   return res.status(201).send({url:`https://fair-gray-jay-shoe.cyclic.app/${req.body.name}`})
})

app.get("/:id",async(req,res)=>{
    let data=await fs.readFileSync("./db.json","utf-8",(err)=>console.log(err))
    data=JSON.parse(data)
    let item=data.data.find((e)=>e.name==req.params.id)
    if(item){
       return res.redirect(item.url)
    }
    res.send("<h1>sorry</h1>")

})

app.listen(8080,()=>console.log("listenning to 8080"))