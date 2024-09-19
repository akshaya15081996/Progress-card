const mongoose=require('mongoose')
const questionSchema=mongoose.Schema({
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    subcategoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategory'
    },
    title:{
        type:String
    },
    file:{
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports=mongoose.model('question',questionSchema)