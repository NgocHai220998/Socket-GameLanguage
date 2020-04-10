let configDatabase = require('../config/configDatabase.json');
let mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect(`mongodb://${configDatabase.username}:${configDatabase.password}@ds157829.mlab.com:57829/back-end`, {useNewUrlParser : true});
    
    // console.log(`mongodb+srv://${configDatabase.databaseName}:${configDatabase.password}@learn-japanese-ka1ev.mongodb.net/test?retryWrites=true&w=majority`);
}

