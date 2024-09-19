const { sendOkResponse, sendServerError } = require('../../../core/response');

const question = require('./questions.model')
//insert into question
const saveQuestion =async (req,res)=>{
    console.log(req.body,'req')
    try{
        let questionData= await question.create(req.body);
    
        sendOkResponse({res,payload:questionData})
        }
        catch(error){
            sendServerError({res,error})
        }
}

const findAllquestion = async(req,res)=>{
    try{
        const questionfindallData = await question.find()
        // console.log(questionfindallData);
        
        sendOkResponse({res,payload:questionfindallData})
    }
    catch(error){
        console.log(error)
        sendServerError({res,error})
    }
}
//findbyid
const findquestionbyid= async(req,res)=>{
    try{
        const questionfindid = await question.findById(req.body.id)
        // console.log(questionfindid)
        sendOkResponse({res,payload:questionfindid})
    }
    catch(error){
        sendServerError({res,error})
    }
}
//update
const updatequestion = async(req,res)=>{
    try{
        const updatequestiondata = await question.findByIdAndUpdate(req.body.id,req.body)
        sendOkResponse({res,payload:updatequestiondata})
    }
    catch(error){
        sendServerError({res,error})
    }
}
const findquestionbyidandpopulate= async(req,res)=>{
    try{
        const questionfindid = await question.findById(req.body.id).populate('categoryid')
        .populate('subcategoryid')
        // console.log(questionfindid)
        sendOkResponse({res,payload:questionfindid})
    }
    catch(error){
        sendServerError({res,error})
    }
}
//delete
const deletequestion = async(req,res)=>{
    try{
        const deletequestiondata = await question.findByIdAndDelete(req.body.id)
        sendOkResponse({res,payload:deletequestiondata})
    }
    catch(error){
        sendServerError({res,error})
    }
}

const findWithCategoryAndSubcategory = async (req, res) => {
    try {
        const joinData = await question.find()
            .populate('categoryid')
            .populate('subcategoryid')
// console.log(joinData);

        sendOkResponse({ res, payload: joinData });
    } catch (error) {
        console.error('Error fetching data:', error);
        sendServerError({ res, message: 'An error occurred while fetching data' });
    }
};



module.exports = {saveQuestion,findAllquestion,findquestionbyid,updatequestion,deletequestion,findWithCategoryAndSubcategory,findquestionbyidandpopulate}
