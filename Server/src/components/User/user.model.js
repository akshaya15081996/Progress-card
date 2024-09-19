const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email:{
         type:String,
         required:true,
         type: String,
         unique:true,
         dropDups: true
    
},
    password:{
        type:String,
        required:true
    },
    usertype:{
        type:Number
    },
    // token:{
    //     type:String,
    //     // default:null
    // },
        
    createAt:{
        type:Date,
        default:Date.now()
    }
}) 

userSchema.pre('save',async function(next){
    const user = this;

    

    if(!user.isModified('password')){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password,salt);
        user.password=hashedPassword ;
        next()
    }catch(error){
        next(error)
    }
})

module.exports = mongoose.model("user",userSchema)