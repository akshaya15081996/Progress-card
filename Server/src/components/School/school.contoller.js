const { sendOkResponse, sendServerError } = require("../../../core/response");
const school = require("./school.model");
const user = require("../User/user.model");

const saveschool = async (req, res) => {
  try {
    let userparam = {
      email: req.body.email,
      password: req.body.password,
      usertype: 2,
    };
    let existingEmail = await user.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
    let userData = await user.create(userparam);

    // console.log(countryData)
    let schoolparam = {
      schoolname: req.body.schoolname,
      userid: userData.id,
      contactno: req.body.contactno,
      address: req.body.address,
      file: req.body.file,
      schoolcode: req.body.schoolcode,
    };
    // console.log(req.body.countryid)
    let schoolData = await school.create(schoolparam);
    res
      .status(200)
      .json({ message: "School added successfully", data: schoolData });

    // sendOkResponse({ res, payload: schoolData })
  } catch (error) {
    sendServerError({ res, error });
  }
};

const updateschool = async (req, res) => {
  try {
    // Fetch the school data to be updated
    const schoolToUpdate = await school
      .findById(req.body.id)
      .populate(["userid"]);
    if (!schoolToUpdate) {
      return res.status(404).json({ message: "School not found" });
    }
    if (req.body.email !== schoolToUpdate.userid.email) {
      const existingEmail = await user.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email Already Exists" });
      }
    }

    // Update the school data
    const updateschooldata = await school.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );

    // Update the user data if the email is included in the request
    if (req.body.email) {
      await user.findByIdAndUpdate(updateschooldata.userid, {
        email: req.body.email,
      });
    }

    // Send success response with updated data
    sendOkResponse({ res, payload: updateschooldata });
  } catch (error) {
    // Handle and send error response
    sendServerError({ res, error });
  }
};

//delete school
const deleteschool = async (req, res) => {
  try {
    const deleteschooldata = await school.findByIdAndDelete(req.body.id);
    const deleteuserdata = await user.findByIdAndDelete(
      deleteschooldata.userid
    );
    sendOkResponse({ res, payload: deleteschooldata });
  } catch (error) {
    sendServerError({ res, error });
  }
};
//finaall school
const findallschool = async (req, res) => {
  try {
    const findschooldata = await school.find().populate(["userid"]);

    sendOkResponse({ res, payload: findschooldata });
  } catch (error) {
    sendServerError({ res, error });
  }
};
//findall school by id
const findschoolbyid = async (req, res) => {
  try {
    const schoolfindid = await school
      .findById(req.body.id)
      .populate(["userid"]);

    sendOkResponse({ res, payload: schoolfindid });
  } catch (error) {
    sendServerError({ res, error });
  }
};

module.exports = {
  saveschool,
  updateschool,
  deleteschool,
  findallschool,
  findschoolbyid,
};
