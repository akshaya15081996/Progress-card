const express=require('express')
const router=express.Router()

const {savelogin,saveregistration,tokendecode,adminlogin}=require('./login.controller')
router.post('/register',saveregistration)
router.post('/login',savelogin)
router.post('/tokendecode',tokendecode)
router.post('/adminlogin',adminlogin)




module.exports=router