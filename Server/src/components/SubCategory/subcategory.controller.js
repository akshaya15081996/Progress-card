const { sendOkResponse, sendServerError } = require('../../../core/response');
const subcategory=require('./subcategory.model')
//savesubcat
const savesubcat=async(req,res)=>{
    // console.log(req.body,'rr');
    
    try{
        const savesubcatdata=await subcategory.create(req.body)
        sendOkResponse({res,payload:savesubcatdata})
        // console.log(savesubcatdata,'rrrr');

    }catch(error){
        sendServerError({res,error})
    }
}


const findwithcategory  = async(req,res)=>{
     
    
    const joindata = await subcategory.find().populate('parentcategory')
    // console.log(joindata)
    sendOkResponse({res,payload:joindata})

}
//findsubcat
const findsubcat=async(req,res)=>{
    try{
        const findsubcatdata=await subcategory.find()
        sendOkResponse({res,payload:findsubcatdata})

    }catch(error){
        sendServerError({res,error})
    }
}
//findbyid
const findbyid=async(req,res)=>{
    try{
        const findbyiddata=await subcategory.findById(req.body.id)
        sendOkResponse({res,payload:findbyiddata})

    }catch(error){
        sendServerError({res,error})

    }
}
//updatesubcat
const updatesubcat=async(req,res)=>{
    // console.log(req.body,'ee')

    try{
        const updatedata=await subcategory.findByIdAndUpdate(req.body.id,req.body)

        sendOkResponse({res,payload:updatedata})

    }catch(error){
        sendServerError({res,error})

    }
}
//deletesubcat
const deletesubcat=async(req,res)=>{
    try{
        const deletedata=await subcategory.findByIdAndDelete(req.body.id)
        sendOkResponse({res,payload:deletedata})


    }catch(error){
        sendServerError({res,error})

    }
}

module.exports={savesubcat,findsubcat,findbyid,updatesubcat,deletesubcat,findwithcategory}