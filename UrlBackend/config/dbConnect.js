const mongoose=require('mongoose')

const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(()=>{
            console.log("connection with db success")
        }).catch((err)=>{
            console.log("connection failed")
        })

    }catch(err){
        console.log("error occured in connection",err)
    }
}

module.exports=dbConnect