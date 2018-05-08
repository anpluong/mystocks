var webpack = require('webpack');
var path = require('path');

const config = {
   entry: './src/client/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, './build')
   },
   module: {
    rules: [
      { use: ['style-loader', 'css-loader'],
      test: /\.css$/
      },
     {
       test: /\.(jsx|js)?$/,
       use: [{
         loader: "babel-loader",
         options: {
           cacheDirectory: true,
           presets: ['react', 'es2015'] // Transpiles JSX and ES6
         }
       }]
     }
    ],

  }
};

module.exports = config;