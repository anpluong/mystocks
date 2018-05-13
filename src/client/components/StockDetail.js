import React, {Component} from 'react';
import axios from 'axios';
import StockDateList from './StockDateList';

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
      console.log('componentWillRecieveProps... nextProps:, ', nextProps);
        // if the selectedStock is deleted, and the array of stock is empty, at that time
        // the first element of the array stock is null and is passed to the child and
        // it should not render anything.
        if (nextProps.selectedStock) {
        axios.get(URL + nextProps.selectedStock)
        .then((response) => {
            const timeSeries = "Time Series (Daily)";
            let dateObject = response.data[timeSeries]
            let stockDate = response.data["Meta Data"]["3. Last Refreshed"].split(" ");
            let stockPriceOpen = dateObject[stockDate[0]]["1. open"];
            let stockPriceClose = dateObject[stockDate[0]]["4. close"];

            this.setState({
            stockLabel: nextProps.selectedStock,
            stockDate,
            stockPriceClose,
            stockPriceOpen,
            priceHistory: dateObject
        })
      })
    }

}


    render() {
        if (!this.props.selectedStock) {
            return <div className="col-md-8">Please select a stock quote...</div>
        }

        let {onDeleteStock} = this.props;
        console.log('state: ', this.state);

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
                <div className="delete">
                    <button type="button" onClick={() => this.props.onRemoveStock(this.state.stockLabel)}>
                        Delete
                    </button>
                    <button type="button" onClick={() => this.props.onSaveStock(this.state.stockLabel)}>
                        Save
                    </button>
                </div>
            </div>
        )
    }
}

export default StockDetail;
