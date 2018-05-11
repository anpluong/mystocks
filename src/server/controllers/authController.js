const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const path = require('path');
const authController = {};

// This promisifys the jwt.sign method
const jwtSignAsync = (pyld, scrt) => {
  return new Promise((resolve, reject) => {
    jwt.sign(pyld, scrt, {expiresIn: 6000}, function(error, token) {
      if (error) {
        console.log('jwt sign error: ', error);
        reject(res.json({jwtSignAsyncError : error}));
      } else {
        console.log('setting jwt in res.cookie');
        resolve(token);
      }
    });
  });
}

authController.setJWT = (req, res, next) => {
  console.log('authController.setJWT...');
  const payload = {
    usr: res.locals.currentUsr
  };
  jwtSignAsync(payload, process.env.JWT_SECRET)
    .then((token) => res.json({
      success: true,
      err: null,
      token
    }))
    .catch((err) => {
      console.log('error setting JWT: ', err)
      res.status(404).send('authController setJWT error: ');
    })
}

module.exports = authController;
