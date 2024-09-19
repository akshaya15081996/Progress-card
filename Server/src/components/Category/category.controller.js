const { sendOkResponse, sendServerError } = require('../../../core/response');
const category=require('./category.model')
//savecategory
const savecategory=async(req,res)=>{
    try{
        const categorydata=await category.create(req.body)
        sendOkResponse({res,payload:categorydata})
        // console.log(categorydata)

    }catch(error){
        sendServerError({res,error})
    }
}
const findcategory = async(req,res)=>{
    try{
        const findcategoryData = await category.find()
        // console.log(categoryData)
        sendOkResponse({res,payload:findcategoryData})
    }
    catch(error){
        console.log(error)
        sendServerError({res,error})
    }
}


const findbyid = async(req,res)=>{
    // console.log(req.body)
    try{
        const categoryFind = await category.findById(req.body.id)
        // console.log(req.body.id,'iii')
        sendOkResponse({res,payload:categoryFind})
    }
    catch(error){
        sendServerError({res,error})
    }
}

const updatecategory = async(req,res)=>{
    // console.log(req.body,'rr')
    try{
        const updatedata = await category.findByIdAndUpdate(req.body.id,req.body, { new: true })
        // console.log(updatedata,'ud')
        sendOkResponse({res,payload:updatedata})
    }
    catch(error){
        sendServerError({res,error})
    }
}
const deletecategory = async(req,res)=>{
    console.log(req.body,'rr')
    try{
        const deletedata = await category.findByIdAndDelete(req.body.id)
        sendOkResponse({res,payload:deletedata})
    }
    catch(error){
        sendServerError({res,error})
    }
}




module.exports={savecategory,findcategory,findbyid,updatecategory,deletecategory}