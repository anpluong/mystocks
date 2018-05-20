import React, { Component } from 'react';
import axios from 'axios';
import Dygraph from 'dygraphs';
const apiKey = '6H8OCBWU5LYNFJOH';

class Graph extends Component {

  constructor(props) {
    super(props);
    console.log("Graph constructor()");
    console.log(props);
  }

  fetchGraphData() {
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.selectedStock}&interval=1min&apikey=${apiKey}&datatype=csv`;
    return axios.get(url)
      .then((response) => {
        const timeSeries = "Time Series (1min)";
        let data = response.data[timeSeries];
        new Dygraph(this.props.selectedStock, response.data).resize(1000, 400);
      });
  }

  // No need for componentDidMount for I guess...
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.fetchGraphData();
  }

  render() {
    return (
      <div id={this.props.selectedStock}> </div>
    )
  }
}


export default Graph;
