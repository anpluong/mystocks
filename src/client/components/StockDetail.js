import React, { Component } from 'react';
import axios from 'axios';
import StockDateList from './StockDateList';
import Table from './Table';
import Graph from './Graph';
const apiKey = '6H8OCBWU5LYNFJOH';

class StockDetail extends Component {
  constructor(props) {
    console.log('StockDetail constructor');
    super(props);
    this.state = {
      /* I removed 'stockLabel' from state because it was just a copy of 'symbol' from
        the App component. Having duplicated state is an antipattern, instead we will simply
        pass down 'symbol as a prop of StockDetail'
       */
      stockDate: '',
      open: '',
      high: '',
      low: '',
      close: '',
      adjustedClose: '',
      volume: ''
    }
    this.fetchTimeSeriesDaily = this.fetchTimeSeriesDaily.bind(this);
  }

  fetchTimeSeriesDaily() {
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=compact&symbol=${this.props.selectedStock}&apikey=${apiKey}`;
    return axios.get(url)
      .then((response) => {
        const stockDate = response.data["Meta Data"]["3. Last Refreshed"];
        const resultsObject = response.data["Time Series (Daily)"][stockDate];
        const open = resultsObject["1. open"];
        const high = resultsObject["2. high"];
        const low = resultsObject["3. low"];
        const close = resultsObject["4. close"];
        const adjustedClose = resultsObject["5. adjusted close"];
        const volume = resultsObject["6. volume"];

        this.setState({

          stockDate: stockDate,
          open: open,
          high: high,
          low: low,
          close: close,
          adjustedClose: adjustedClose,
          volume: volume
        });
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  componentDidMount() {
    console.log('StockDetail componentDidMount');
    this.fetchTimeSeriesDaily();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('StockDetail componentDidUpdate');
    /* componentWillRecieveProps is deprecated, docs say that if you
      need to calculate a new state based on a change in props, use either
      getDerivedState() or componentDidUpdate()
    */
      // if the selectedStock is deleted, and the array of stock is empty, at that time
      // the first element of the array stock is null and is passed to the child and
      // it should not render anything.

    // If the user deletes all their saved stocks, return nothing.
    if (this.props.selectedStock === '') {
      return null;
    }

    // If selected stock changes, make a request to get the new selectedStock's data
    if (prevProps.selectedStock !== this.props.selectedStock) {
      this.fetchTimeSeriesDaily();
    } else {
      return null;
    }
  }

  render() {
    if (!this.props.selectedStock) {
      return <div className="col-md-8"> Please select a stock quote... </div>
    }

    return (
      <div className="col-md-8">
        {/* <p>{this.stockSearch(this.props.selectedStock)}</p> */}
        <Table
          stocks={this.props.stocks}
          selectedStock = {this.props.selectedStock}
          stockDate={this.state.stockDate}
          open={this.state.open}
          high={this.state.high}
          low={this.state.low}
          close={this.state.close}
          adjustedClose={this.state.adjustedClose}
          volume={this.state.volume}
          onAddStock={this.props.onAddStock}
          onDeleteStock={this.props.onDeleteStock} />
        <Graph selectedStock={this.props.selectedStock} />
      </div>
    )
  }
}

export default StockDetail;
