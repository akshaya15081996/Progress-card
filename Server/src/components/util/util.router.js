const express = require("express");
const router = express.Router();

const {fileUpload} = require('./util.controller')

router.post("/fileupload",  fileUpload);

module.exports = router;
