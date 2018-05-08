import React from 'react'
import StockListItem from './StockListItem';

const StockList  = (props) => {
    const stockItems = props.stocks.map((stock) => {
        return (
            <StockListItem 
                key = {stock}
                stock = {stock}
            />
        )
    })

    return (
        <ul className="col-md-2 list-group">
            {stockItems}
        </ul>
    )
  
}

export default StockList;