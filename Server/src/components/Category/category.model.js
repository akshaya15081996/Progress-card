const mongoose=require('mongoose')
const categorySchema=mongoose.Schema({
    name: {
        type: String,
        default:null,
        required:true
    },
    image:{
        type:String
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports=mongoose.model('category',categorySchema)