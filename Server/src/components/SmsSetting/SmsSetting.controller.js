const { sendOkResponse, sendServerError } = require('../../../core/response');

const sms = require('./SmsSetting.model')
//insert into sms
const saveSms =async (req,res)=>{
    try{
        let smsData= await sms.create(req.body);
    
        sendOkResponse({res,payload:smsData})
        }
        catch(error){
            sendServerError({res,error})
        }
}

const findAllsms = async(req,res)=>{
    try{
        const smsfindallData = await sms.find()
        // console.log(smsfindallData);
        
        sendOkResponse({res,payload:smsfindallData})
    }
    catch(error){
        console.log(error)
        sendServerError({res,error})
    }
}
//findbyid
const findsmsbyid= async(req,res)=>{
    try{
        const smsfindid = await sms.findById(req.body.id)
        // console.log(smsfindid)
        sendOkResponse({res,payload:smsfindid})
    }
    catch(error){
        sendServerError({res,error})
    }
}
//update
const updatesms = async(req,res)=>{
    try{
        const updatesmsdata = await sms.findByIdAndUpdate(req.body.id,req.body)
        sendOkResponse({res,payload:updatesmsdata})
    }
    catch(error){
        sendServerError({res,error})
    }
}

//delete
const deletesms = async(req,res)=>{
    try{
        const deletesmsdata = await sms.findByIdAndDelete(req.body.id)
        sendOkResponse({res,payload:deletesmsdata})
    }
    catch(error){
        sendServerError({res,error})
    }
}





module.exports = {saveSms,findAllsms,findsmsbyid,updatesms,deletesms}
