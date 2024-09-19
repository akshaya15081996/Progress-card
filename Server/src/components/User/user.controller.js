const { sendOkResponse, sendServerError } = require('../../../core/response');
const bcrypt = require('bcrypt');

const user = require('./user.model')
// insert into user
const saveuser = async (req, res) => {
    try {
        let userData = await user.create(req.body);

        sendOkResponse({ res, payload: userData })
    }
    catch (error) {
        sendServerError({ res, error })
    }
}
//find all users
const finduser = async (req, res) => {
    try {
        const alluser = await user.find()

        sendOkResponse({ res, payload: alluser })

    } catch (error) {
        sendServerError({ res, error })

    }
}

module.exports = { saveuser, finduser }