let mongoose=require("mongoose")
let connect=async()=>{
    return mongoose.connect(process.env.url)
}
module.exports=connect