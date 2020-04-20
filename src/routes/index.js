const authRoute = require('./auth')();
const mainRoute = require('./main')();
const rankRoute = require('./rank')();
const constant = require('../constants/api')();


module.exports = (app) => {
  app.use(constant.ROOT_API.AUTH, authRoute);
  app.use(constant.ROOT_API.MAIN, mainRoute);
  app.use(constant.ROOT_API.RANK, rankRoute);
}