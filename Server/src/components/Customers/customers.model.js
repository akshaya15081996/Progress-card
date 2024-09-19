const mongoose=require('mongoose')
const customerschema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    phoneno:{
        type:Number
    },
    name: {
        type: String,
        default:null
    },
    dateOfBirth: {
        type: String,
    },
    age: {
        type: Number,
        default:null

    },
    class: {
        type: String,
        default:null

    },
    address: {
        type: String,
        default:null

    },
    whatsappno: {
        type: Number,
        default:null

    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})





module.exports=mongoose.model('customer_signupdetails',customerschema)