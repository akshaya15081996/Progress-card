const { sendOkResponse, sendServerError } = require('../../../core/response');

const roles = require('./roles.model')
//insert into roles
const saveroles =async (req,res)=>{
    try{
        let rolesData= await roles.create(req.body);
    
        sendOkResponse({res,payload:rolesData})
        }
        catch(error){
            sendServerError({res,error})
        }
}

const findAllroles = async(req,res)=>{
    try{
        const rolesfindallData = await roles.find()
        // console.log(rolesfindallData);
        
        sendOkResponse({res,payload:rolesfindallData})
    }
    catch(error){
        console.log(error)
        sendServerError({res,error})
    }
}
//findbyid
const findrolesbyid= async(req,res)=>{
    try{
        const rolesfindid = await roles.findById(req.body.id)
        // console.log(rolesfindid)
        sendOkResponse({res,payload:rolesfindid})
    }
    catch(error){
        sendServerError({res,error})
    }
}
//update
const updateroles = async(req,res)=>{
    try{
        const updaterolesdata = await roles.findByIdAndUpdate(req.body.id,req.body)
        sendOkResponse({res,payload:updaterolesdata})
    }
    catch(error){
        sendServerError({res,error})
    }
}

//delete
const deleteroles = async(req,res)=>{
    try{
        const deleterolesdata = await roles.findByIdAndDelete(req.body.id)
        sendOkResponse({res,payload:deleterolesdata})
    }
    catch(error){
        sendServerError({res,error})
    }
}





module.exports = {saveroles,findAllroles,findrolesbyid,updateroles,deleteroles}
