const mongoose=require('mongoose')
const smsSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    secretkey:{
        type:String,
        required:true
    },
    apikey:{
        type:String,
        required:true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports=mongoose.model('sms',smsSchema)