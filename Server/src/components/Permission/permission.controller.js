const { sendOkResponse, sendServerError } = require('../../../core/response');
const permission=require('./permission.model')
//savepermission
const savepermission=async(req,res)=>{
    // console.log(req.body,'rr');
    
    try{
        const savepermissiondata=await permission.create(req.body)
        sendOkResponse({res,payload:savepermissiondata})
        // console.log(savepermissiondata,'rrrr');

    }catch(error){
        sendServerError({res,error})
    }
}

//findall
const findallpermission  = async(req,res)=>{
     
    
    const joindata = await permission.find()
    // console.log(joindata)
    sendOkResponse({res,payload:joindata})

}

//findbyid
const findpermissionbyid=async(req,res)=>{
    try{
        const findbyiddata=await permission.findById(req.body.id)
        sendOkResponse({res,payload:findbyiddata})

    }catch(error){
        sendServerError({res,error})

    }
}
//updatepermission
const updatepermission=async(req,res)=>{
    // console.log(req.body,'ee')

    try{
        const updatedata=await permission.findByIdAndUpdate(req.body.id,req.body)

        sendOkResponse({res,payload:updatedata})

    }catch(error){
        sendServerError({res,error})

    }
}
//deletepermission
const deletepermission=async(req,res)=>{
    try{
        const deletedata=await permission.findByIdAndDelete(req.body.id)
        sendOkResponse({res,payload:deletedata})


    }catch(error){
        sendServerError({res,error})

    }
}

module.exports={savepermission,findpermissionbyid,updatepermission,deletepermission,findallpermission}