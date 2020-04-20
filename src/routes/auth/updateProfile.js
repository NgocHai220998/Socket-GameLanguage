const userModel = require('../../models/userModel.js');

module.exports = (req, res) => {
    if (!req.body.token) {
      res.json({
        code: 403,
        title: 'Err',
        data: {
          message: 'Token is a required field'
        }
      })
    } else {
      userModel.updateProfile(req.body).then((result) => {
        if (result.code === 200) {
          res.json({
            code: 200,
            title: 'Success',
            data: {
              message: 'Update profile okie',
            }
          })
        } else {
          res.json({
            code: 403,
            title: 'Err',
            data: {
              message: 'Update err'
            }
          })
        }
      }).catch((err) => {
        res.statusCode(400).send('err')
      })
    }
}