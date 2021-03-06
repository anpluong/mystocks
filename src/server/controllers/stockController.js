/*** stockController.js ***/
const db = require('../database');
const stockController = {};

// This function inserts into the stock table if it does not exist already, then returns the stock_id.
// If it already exists, it just returns the id
const getInsertStockId = (symbol) => {
  return db.task('getInsertStockId', t => {
          return t.oneOrNone('SELECT stock_id FROM stock WHERE symbol = $1', symbol, s => s && s.stock_id)
              .then(stock_id => {
                  return stock_id || t.one('INSERT INTO stock(symbol) VALUES($1) RETURNING stock_id', symbol, s => s.stock_id);
              });
      });
}

const grabStockId = (symbol) => {
  return db.one('SELECT * FROM stock WHERE symbol = $1', [symbol]);
}

const deleteUsrStockEntry = (usr_id, stock_id) => {
  return db.none('DELETE FROM usr_stock WHERE usr_id = $1 AND stock_id = $2', [usr_id, stock_id]);
}

const checkForMoreRecords = (stock_id) => {
  return db.any('SELECT * FROM usr_stock WHERE stock_id = $1', [stock_id]);
}

stockController.getMyStocks = (req, res) => {
  console.log('req.query: ', req.query);
  const usr_id = req.query.id;



  return db.any('SELECT stock.symbol FROM usr_stock INNER JOIN stock ON usr_id = $1 AND usr_stock.stock_id = stock.stock_id', [usr_id])
    .then(matchedEntries => {
      console.log('matchedEntries: ', matchedEntries);
      let stockSymbols = matchedEntries.map(obj => {
        return obj.symbol;
      });
      console.log('stockSymbols: ', stockSymbols);
      res.json({stockSymbols: stockSymbols})
    })
    .catch((error) => {
      console.log('error grabbing users stock symbols: ', error);
    });
}


stockController.saveStock = (req, res, next) => {
  const { symbol, usr_id } = req.body;
  getInsertStockId(symbol)
    .then(id => {
      db.one('INSERT INTO usr_stock(usr_id, stock_id) VALUES($1, $2) RETURNING usr_id', [usr_id, id]);
      res.json({ success: true, err: null });
    })
    .catch (error => {
      console.log('saving stock db error: ', error);
      res.status(404).end('error saving stock: ', error);
    });
}

stockController.removeStock = (req, res, next) => {
  // We want to remove just the entry in the "usr_stock" join table.
  // this is because other users may have records with that same stock
  // EXCEPTION ---> We want to delete from "stock" table as well only if
  // this was the only user who had saved that stock.
  // In other words, if no other users have saved that stock, delete it from the stock table.

  // STEP BY STEP
  // First grab stock_id
  // perform DELETE from join table
  // SELECT * from usr_stock where stock_id = the stock_id we just deleted
  // if nothing is returned from the select (no other users with that stock)...
  // then we remove from the stock table as well
  // else do nothing
  const { symbol, usr_id } = req.body;
  db.task(t => {
    // grab stock id
    return t.one('SELECT * FROM stock WHERE symbol = $1', [symbol])
    .then(stock => {
      // delete entry from join table
      return t.one('DELETE FROM usr_stock WHERE usr_id = $1 AND stock_id = $2 RETURNING stock_id', [usr_id, stock.stock_id])
      .then((deletedStockId) => {
        console.log('deletedStockId: ', deletedStockId);
        console.log('deletedStockId.stock_id: ', deletedStockId.stock_id);
        let s_id = deletedStockId.stock_id;
        // Check if other users have saved this stock
        return t.any('SELECT * FROM usr_stock WHERE stock_id = $1', [s_id])
        .then((data) => {
          console.log('data: ', data);
          if (data.length === 0) {
            return t.none('DELETE FROM stock WHERE stock_id = $1', [s_id]);
          }
        })
      });
    });
  })
  .then(events => {
    res.json({success: true});
  })
  .catch(error => {
    console.log('remove error: ', error);
  });
}



module.exports = stockController;
