const router = require('express').Router();
const constants = require('../../constants/api.js')();
const handleUpdateProfile = require('../auth/updateProfile.js');


module.exports = () => {
  router.put(constants.USER.UPDATE_PROFILE, handleUpdateProfile);
  return router;
}