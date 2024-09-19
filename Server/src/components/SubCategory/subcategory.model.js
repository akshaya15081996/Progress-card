const mongoose=require('mongoose')
const subcatSchema=mongoose.Schema({
    parentcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    subcategory:{
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
module.exports=mongoose.model('subcategory',subcatSchema)