const express=require('express')
const router=express.Router()
const {savepermission,findpermissionbyid,updatepermission,deletepermission,findallpermission}=require('./permission.controller')
router.post('/savepermission',savepermission)
router.post('/findpermissionbyid',findpermissionbyid)
router.post('/updatepermission',updatepermission)
router.post('/deletepermission',deletepermission)
router.get('/findallpermission',findallpermission)


module.exports=router