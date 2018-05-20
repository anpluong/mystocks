import React from 'react'

const StockList = props => {
  const stockItems = props.stocks.map(stock => {
    return (
      <li className="list-group-item" key={stock}>
        <a onClick={() => props.chooseStock(stock)}><div>{stock}</div></a>
      </li>
    )
  });
  
  return (
    <ul className="col-md-2 list-group">
      {stockItems}
    </ul>
  )
}

export default StockList;
