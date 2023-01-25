let mongoose =require("mongoose")

let dbSchema=new mongoose.Schema({
    name:{type:String,unique:true},
    url:String,
    time:{type:Number}
})

let Short=mongoose.model("short",dbSchema)

module.exports=Short