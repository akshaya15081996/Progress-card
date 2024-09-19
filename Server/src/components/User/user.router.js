const express=require('express')
const router=express.Router()


const{saveuser,finduser}=require('./user.controller')
router.post('/saveuser',saveuser)
router.get('/finduser',finduser)

module.exports=router