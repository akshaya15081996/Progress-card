const { sendOkResponse, sendServerError } = require('../../../core/response');
const user=require('../User/user.model')
const customers=require('./customers.model')

//updatecustomer
const updatecustomer=async(req,res)=>{
    // console.log(req.body,'r')
    try{
       
     const customerdata=await customers.findByIdAndUpdate(req.body.id,req.body)
     sendOkResponse({ res, payload: customerdata })


    }catch(error){
        sendServerError({ res, error })

    }
}



module.exports={updatecustomer}