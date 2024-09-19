const express=require('express')
const router=express.Router()

const {updatecustomer}=require('./customers.controller')

router.post('/updatecustomer',updatecustomer)


module.exports=router 