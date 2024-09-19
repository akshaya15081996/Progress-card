const express = require("express");

const router = express.Router()

const {saveschool,updateschool,deleteschool,findallschool,findschoolbyid} = require('./school.contoller')
router.get('/',(req,res)=>res.json('school loaded'))
router.post('/saveschool',saveschool)
router.get('/findallschool',findallschool)
router.post('/findschoolbyid',findschoolbyid)
router.post('/updateschool',updateschool)
router.post('/deleteschool',deleteschool)



module.exports=router