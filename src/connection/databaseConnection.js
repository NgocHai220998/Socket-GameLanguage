let configDatabase = require('../config/configDatabase.json');
const url = 'mongodb://localhost:27017'
let mongoose = require("mongoose");
// console.log(process.env.NODE_ENV)

module.exports = () => {
    if (process.env.NODE_ENV === 'production') {
        mongoose.connect(`mongodb://${configDatabase.username}:${configDatabase.password}@ds157829.mlab.com:57829/back-end`, {useNewUrlParser : true});
    } else {
        mongoose.connect(url, { useNewUrlParser: true })
    }
}

