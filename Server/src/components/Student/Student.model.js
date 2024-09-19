const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const studentSchema = mongoose.Schema({
    studentname:{
        type:String,
        
    },
    class:{
        type:String 
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'user'
    },
   
    contactno :{
        type:String
    },
    address:{
        type:String
    }, 
   dob:{
    type:String
   },
   image:{
        type: String
     },
        
    createAt:{
        type:Date,
        default:Date.now()
    }
})



module.exports = mongoose.model("student",studentSchema)
