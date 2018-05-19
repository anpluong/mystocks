import React, {Component} from 'react';
import axios from 'axios';
import StockDateList from './StockDateList';
const apiKey = '6H8OCBWU5LYNFJOH';
const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&apikey=${apiKey}&symbol=`;

class StockDetail extends Component {
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

    componentDidUpdate(prevProps, prevState, snapshot) {
      console.log('prevProps:, ', prevProps);
      console.log('prevState: ', prevState);
      console.log('snapshot: ', snapshot);
        // if the selectedStock is deleted, and the array of stock is empty, at that time
        // the first element of the array stock is null and is passed to the child and
        // it should not render anything.

        if (this.props.selectedStock === '') {
          return null;
        }

        if (prevProps.selectedStock !== this.props.selectedStock) {
        axios.get(URL + this.props.selectedStock)
          .then((response) => {
            const timeSeries = "Time Series (Daily)";
            let dateObject = response.data[timeSeries]
            let stockDate = response.data["Meta Data"]["3. Last Refreshed"].split(" ");
            let stockPriceOpen = dateObject[stockDate[0]]["1. open"];
            let stockPriceClose = dateObject[stockDate[0]]["4. close"];

            this.setState({
              stockLabel: this.props.selectedStock,
              stockDate,
              stockPriceClose,
              stockPriceOpen,
              priceHistory: dateObject
            });
          });
        } else {
          return null;
        }
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
                {this.props.onDeleteStock ?
                    <div className="Delete">
                        <button type="button" onClick={() => this.props.onDeleteStock(this.state.stockLabel)}>
                            Delete
                        </button>
                    </div>
                    : <div className="Add">
                        <button type="button" onClick={() => this.props.onAddStock(this.state.stockLabel)}>
                            Add
                        </button>
                    </div>
                }
                <div id="graphdiv2"></div>
            </div>
        )
    }
}

export default StockDetail;
