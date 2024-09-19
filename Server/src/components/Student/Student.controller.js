const { sendOkResponse, sendServerError } = require("../../../core/response");

const student = require("./Student.model");
const user = require("../User/user.model");
//savestudent
const savestudent=async(req,res)=>{
    console.log(req.body,'request')
    try{
        let userparams={
            email:req.body.email,
            password:req.body.password,
            usertype:1
        }
        let existingemail=await user.findOne({email:req.body.email})
        if(existingemail){
         return   res.status(400).json({message:"Email already exists"})
        }
        let userdata=await user.create(userparams)
        let studentparams={
            userid:userdata._id,
            studentname:req.body.studentname,
            class:req.body.class,
            contactno:req.body.contactno,
            address:req.body.address,
            dob:req.body.dob,
            image:req.body.image
        }
        const studentdata=await student.create(studentparams)
      sendOkResponse({res,payload:studentdata})
    }catch(error){
        sendServerError({res,error})
    }
}
//findAllstudent
const findAllstudent=async(req,res)=>{
    try{
        const findstudent=await student.find().populate(['userid'])
        console.log(findstudent,'fs')
      sendOkResponse({res,payload:findstudent})


    }catch(error){
        sendServerError({res,error})

    }
}
//findstudentbyid
const findstudentbyid=async(req,res)=>{
    try{
        const findbystudentid=await student.findById(req.body.id).populate(['userid'])
        console.log(findbystudentid,'fscd')
      sendOkResponse({res,payload:findbystudentid})


    }catch(error){
        sendServerError({res,error})

    }
}
//updatestudent
const updatestudent = async (req, res) => {
    try {
      // Fetch the student data to be updated
      const studentToUpdate = await student
        .findById(req.body.id)
        .populate(["userid"]);
      if (!studentToUpdate) {
        return res.status(404).json({ message: "student not found" });
      }
      if (req.body.email !== studentToUpdate.userid.email) {
        const existingEmail = await user.findOne({ email: req.body.email });
        if (existingEmail) {
          return res.status(400).json({ message: "Email Already Exists" });
        }
      }
  
      // Update the student data
      const updatestudentdata = await student.findByIdAndUpdate(
        req.body.id,
        req.body,
        { new: true }
      );
  
      // Update the user data if the email is included in the request
      if (req.body.email) {
        await user.findByIdAndUpdate(updatestudentdata.userid, {
          email: req.body.email,
        });
      }
  
      // Send success response with updated data
      sendOkResponse({ res, payload: updatestudentdata });
    } catch (error) {
      // Handle and send error response
      sendServerError({ res, error });
    }
  };
//deletestudent
const deletestudent=async(req,res)=>{
    try{
        const deletestudentdata=await student.findByIdAndDelete(req.body.id)
        const deleteuserdata=await user.findByIdAndDelete(deletestudentdata.userid)
        sendOkResponse({res,payload:deletestudentdata})

    }catch(error){
        sendServerError({res,error})

    }
}







module.exports={savestudent,findAllstudent,findstudentbyid,updatestudent,deletestudent}