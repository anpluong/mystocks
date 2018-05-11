/*** usrController.js ***/

const db = require('../database');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;


const usrController = {};

usrController.createUsr = (req, res, next) => {
  console.log('creating new user...');
  const { email, password } = req.body;
  console.log('emailRegister: ', email);
  bcrypt.genSalt(SALT_WORK_FACTOR)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => db.one('INSERT INTO usr(email, password) VALUES($1, $2) RETURNING usr_id', [email, hash]))
    .then(data => {
      // We will need the current usr_id when setting the signing the jwt
      // REMEMBER! res.locals is the preffered way to pass data through middleware.
      res.locals.currentUsr = data.usr_id;
      next();
    })
    .catch(error => {
      console.log('failed to insert usr into db: ', error);
      res.status(404).end('error inserting new user into db: ', error);
    });

}

usrController.verifyUsr = (req, res, next) => {
  console.log('req ', req);
  const { email , password } = req.body;

  console.log('REQ.EMAIL', req.email);
  console.log('REQ.PASSWORD', req.password);
  db.any('SELECT * FROM usr WHERE email = ($1)', [email]).then((data) => {
    console.log('data: ', data);
    bcrypt.compare(password, data[0].password, function(err, isMatch) {
      if (err) return console.log(err);
      if (isMatch) {
        res.locals.currentUsr = data[0].usr_id;
        next();
      } else {
        res.status(404).end('error finding user: ', req.body.user);
      }
    });
  }).catch((error) => {
    console.log('verify usr db error: ', error);
    res.status(404).end('error finding user: ', req.body.user);
  });
}


module.exports = usrController;
