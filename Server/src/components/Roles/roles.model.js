const mongoose=require('mongoose')
const rolesSchema=mongoose.Schema({
    rolename:{
        type:String,
        required:true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
    
})
module.exports=mongoose.model('roles',rolesSchema)