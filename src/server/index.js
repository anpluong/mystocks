var express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./../../webpack.config.js')
var app = express();

app.use(express.static(__dirname +'./../../')); //serves the index.html
app.listen(3000, () => console.log('Example app listening on port 3000!'))   //listens on port 3000 -> http://localhost:3000/