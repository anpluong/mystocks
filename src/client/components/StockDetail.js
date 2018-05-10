import React, {Component} from 'react';
import axios from 'axios';
import StockDateList from './StockDateList';

import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie,
    VictoryTheme, VictoryLabel, VictoryLine, VictoryLegend, VictoryStack } from 'victory';
const apiKey = '6H8OCBWU5LYNFJOH';
const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&apikey=${apiKey}&symbol=`;

// const StockDetail = ({selectedStock}) => {

class StockDetail extends Component {
    // when the selectedStock is not defined

    constructor(props) {
        super(props);

        this.state = {
            stockLabel: '',
            stockDate: '',
            stockPriceOpen: '',
            stockPriceClose: '',
            priceHistory: null
        }      
    }

    componentWillReceiveProps(nextProps) {
        axios.get(URL + nextProps.selectedStock)         
        .then((response) => {     
            const timeSeries = "Time Series (Daily)";
            let dateObject = response.data[timeSeries]
            let stockDate = response.data["Meta Data"]["3. Last Refreshed"].split(" ");
            let stockPriceOpen = dateObject[stockDate[0]]["1. open"];
            let stockPriceClose = dateObject[stockDate[0]]["4. close"];
            // let newArray = [];

            //console.log(dateObject)         

            // for (var property in dateObject) {                
            //     newArray.push({
            //         [property]: Number(dateObject[property]["1. open"])
            //     });
            // }
            // // this is the array of all the data open stock price in 30 days
            // newArray = newArray.slice(0, 7);
            // // console.log(newArray)            

            this.setState({
            stockLabel: nextProps.selectedStock,
            stockDate,
            stockPriceClose,
            stockPriceOpen,
            priceHistory: dateObject
        })
    }) 
    }
    
    render() {
        if (!this.props.selectedStock) {
            return <div className="col-md-8">Please select a stock quote...</div>
        }

        return (
            <div className="col-md-8">
                {/* <p>{this.stockSearch(this.props.selectedStock)}</p> */}
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>Stock Symbol</th>
                            <th>Date</th>
                            <th>Open Price </th>
                            <th>Close Price </th>
                        </tr>
                    </thead>
                    <tbody>                      
                        <tr>
                            <td>
                                {this.state.stockLabel}
                            </td>
                            <td>
                                {this.state.stockDate}
                            </td>
                            <td>
                                {this.state.stockPriceOpen}
                            </td>
                            <td>
                                {this.state.stockPriceClose}
                            </td>                            
                        </tr>
                    </tbody>                    
                </table>
                <div>
                    <StockDateList pH = {this.state.priceHistory} />
                </div>
            </div>            
        )
    }
}

export default StockDetail;