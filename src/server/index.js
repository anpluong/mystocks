const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./../../webpack.config.js');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database');
var app = express();

const usrController = require('./controllers/usrController');
const authController = require('./controllers/authController');
const stockController = require('./controllers/stockController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});


app.use(express.static(__dirname +'./../../')); //serves the index.html

// LOGIN ROUTE
app.post('/login', usrController.verifyUsr, authController.setJWT);
app.post('/register', usrController.createUsr, authController.setJWT);

app.post('/saveStock', stockController.saveStock);
app.post('/removeStock', stockController.removeStock);


// This is a "catch-all" to solve react-router's refresh problem
// Read here: https://tylermcginnis.com/react-router-cannot-get-url-refresh/
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './../../index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});


// Error handling for authentication
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!')); //listens on port 3000 -> http://localhost:3000/
