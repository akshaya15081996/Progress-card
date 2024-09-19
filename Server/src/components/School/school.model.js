const mongoose = require('mongoose')

const schoolSchema = mongoose.Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    schoolname: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    contactno: {
        type: String
    },
    address: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("school", schoolSchema)