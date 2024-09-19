const mongoose = require('mongoose')

function connect(url){
    mongoose.connect(url)
    .then(()=>console.log('Connected To Mongo DB'))
    .catch((err)=>console.error('Error Connecting', err))
}

module.exports = connect