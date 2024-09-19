const express=require('express')
const router=express.Router()
const {savesubcat,findsubcat,findbyid,updatesubcat,deletesubcat,findwithcategory}=require('./subcategory.controller')
router.post('/savesubcat',savesubcat)
router.get('/findsubcat',findsubcat)
router.post('/findbyid',findbyid)
router.post('/updatesubcat',updatesubcat)
router.post('/deletesubcat',deletesubcat)
router.get('/findwithcategory',findwithcategory)


module.exports=router