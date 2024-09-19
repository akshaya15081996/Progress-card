const express = require("express");

const router = express.Router()

const {saveSms,findsmsbyid,updatesms,deletesms,findAllsms} = require('./SmsSetting.controller')
router.get('/',(req,res)=>res.json('sms loaded'))
router.post('/savesms',saveSms)
router.get('/findAllsms',findAllsms)
router.post('/findsmsbyid',findsmsbyid)
router.post('/updatesms',updatesms)
router.post('/deletesms',deletesms)


module.exports = router