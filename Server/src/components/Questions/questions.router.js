const express = require("express");

const router = express.Router()

const {saveQuestion,findquestionbyid,updatequestion,deletequestion,findWithCategoryAndSubcategory,findAllquestion,findquestionbyidandpopulate} = require('./questions.controller')
router.get('/',(req,res)=>res.json('question loaded'))
router.post('/savequestion',saveQuestion)
router.get('/findAllquestion',findAllquestion)
router.post('/findquestionbyid',findquestionbyid)
router.post('/updatequestion',updatequestion)
router.post('/deletequestion',deletequestion)
router.get('/findWithCategoryAndSubcategory',findWithCategoryAndSubcategory)
router.post('/findquestionbyidandpopulate',findquestionbyidandpopulate)


module.exports = router




