const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefine
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the Token
    req.token = bearerToken;
    // Next
    next();
  } else {
    res.sendStatus(403).json({
      code: 403,
      message: 'Token undefine'
    });
  }
}
function verify (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secretkey', (err, data) => {
      if (err) {
        resolve({
          code: 404
        })
        reject(new Error('Something went Error...'));
      } else {
        resolve(data);
      }
    })
  })
}


module.exports = {
  verify,
  verifyToken
}