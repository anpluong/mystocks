
const bluebirdPromise = require('bluebird');
const initOptions = { promiseLib: bluebirdPromise };
const pgp = require('pg-promise')(initOptions);
const env = require('dotenv').config();
const url = process.env.ELEPHANT_URL;
const db = pgp(url);

module.exports = db;


// CREATE TABLE usr (
//  usr_id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
//  email VARCHAR (255) UNIQUE NOT NULL,
//  password VARCHAR (60) NOT NULL,
//  timestamp timestamp default current_timestamp
// );
