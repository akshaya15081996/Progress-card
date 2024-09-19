const express=require('express')
const router=express.Router()
const multer=require('multer')
const upload = multer({ dest: 'uploads/' });

const {savecategory,findcategory,findbyid,updatecategory,deletecategory}=require('./category.controller')
router.post('/savecategory',savecategory)
router.post('/updatecategory', upload.single('file'), updatecategory) 

router.get('/findAll',findcategory) 
router.post('/findbyid',findbyid)
router.post('/updatecategory',updatecategory)
router.post('/deletecategory',deletecategory)

module.exports=router