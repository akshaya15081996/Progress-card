const express=require('express')
const router = express.Router()

const {savestudent,findAllstudent,findstudentbyid,updatestudent,deletestudent} = require('./Student.controller')
router.get('/',(req,res)=>res.json('student loaded'))
router.post('/savestudent',savestudent)
router.get('/findAllstudent',findAllstudent)
router.post('/findstudentbyid',findstudentbyid)
router.post('/updatestudent',updatestudent)
router.post('/deletestudent',deletestudent)


module.exports = router