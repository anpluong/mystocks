
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

// CREATE TABLE stock (
//  stock_id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
//  symbol VARCHAR (55) UNIQUE NOT NULL
// );

// CREATE TABLE usr_stock (
//  usr_id INT  REFERENCES usr (usr_id) ON UPDATE CASCADE ON DELETE CASCADE,
//  stock_id int REFERENCES stock (stock_id) ON UPDATE CASCADE ON DELETE CASCADE,
//  CONSTRAINT usr_stock_pkey PRIMARY KEY (usr_id, stock_id)
// );




// INSERT INTO stock
//     (symbol)
// SELECT 1, 'AMZN'
// WHERE
//     NOT EXISTS (
//         SELECT symbol FROM stock WHERE symbol = 'AMZN'
//     );
// RETURNING stock_id

// postgresql docs - "The optional ON CONFLICT clause specifies an alternative action to raising a unique violation or exclusion constraint violation error. For each individual row proposed for insertion, either the insertion proceeds, or, if an arbiter constraint or index specified by conflict_target is violated, the alternative conflict_action is taken. ON CONFLICT DO NOTHING simply avoids inserting a row as its alternative action. ON CONFLICT DO UPDATE updates the existing row that conflicts with the row proposed for insertion as its alternative action."
