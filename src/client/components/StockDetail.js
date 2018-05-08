import React, {Component} from 'react';
import axios from 'axios';

const apiKey = '6H8OCBWU5LYNFJOH';
const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&apikey=${apiKey}&symbol=`;

const StockDetail = ({selectedStock}) => {

    // when the selectedStock is not defined
    if (!selectedStock) {
        return <div>Please select a stock quote...</div>
    }

    // a function to make axios to get the stock
    function stockSearch(stockSymbol) {        
            axios.get(URL + stockSymbol)         
            .then((response) => {         
                console.log(URL + stockSymbol)   
                console.log(response)
            })
    }
    
        return (
            <div className="col-md-8">
                <p>{stockSearch(selectedStock)}</p>
                <p>{selectedStock}</p>
            </div>
        )

}

export default StockDetail;