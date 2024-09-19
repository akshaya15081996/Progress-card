const mongoose=require('mongoose')
const permissionSchema=mongoose.Schema({

    permission:{
        type:String
    },
    shortcode:{
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now()
    }

})
module.exports=mongoose.model('permission',permissionSchema)