import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from 'lodash';

// Components
import SearchBar from './searchBar';
import StockList from './StockList';
import StockDetail from './StockDetail';
import AuthService from './AuthService';
import withAuth from './withAuth';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            selectedStock: ''
        }
        this.chooseStock = this.chooseStock.bind(this);
        this.onAddStock = this.onAddStock.bind(this);
        this.onDeleteStock = this.onDeleteStock.bind(this);
        this.Auth = new AuthService();
    }

    componentDidMount() {
      console.log('App componentDidMount');
      let usr_id = this.props.jwt.usr;
      axios.get(`/getMyStocks?id=${usr_id}`)
        .then(response => {
          this.setState({
            stocks: response.data.stockSymbols,
            selectedStock: response.data.stockSymbols[0], // Initialize as the user's first saved stock
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // delete Stock function
    onDeleteStock(selectedStock) {
      console.log('onDeleteStock called with arguement: ', selectedStock);
      if (this.state.stocks.length === 0) {
        // prevents unecessary call to backend which will throw an error anyways
        return;
      }
      if (this.state.stocks.length === 1) {
        this.setState({
          stocks: [],
          selectedStock: ''
        });
      }
      axios.post('/removeStock', {
          usr_id: this.props.jwt.usr,
          symbol: selectedStock
        })
        .then(response => {
          // upon successful deletion in the db, we can now update state.
          let oldStocks = [...this.state.stocks];
          let indexOfDeleted = oldStocks.indexOf(selectedStock);
          let newIndex = (indexOfDeleted === 0) ? 0 : indexOfDeleted - 1;
          let newStocks = _.pull(oldStocks, selectedStock);

          this.setState({
            stocks: newStocks,
            selectedStock: oldStocks[newIndex]
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    // add Stock function
    onAddStock(selectedStock) {
      console.log('onAddStock called with arguement: ', selectedStock);
      axios.post('/saveStock', {
        symbol: selectedStock,
        usr_id: this.props.jwt.usr
      })
      .then(response => {
        this.setState({
          selectedStock: selectedStock,
          stocks: this.state.stocks.concat(selectedStock)
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    // This function is used to select the stock item on the left container and
    // this will render the stock detail on the right container. it is called in the child StockList
    chooseStock(selectedStock) {
      console.log('chooseStock called with arguement: ', selectedStock);
      this.setState({
        selectedStock: selectedStock.toUpperCase()
      })
    }
    // I deleted the searchStock method you created because it was VERY similar to chooseStock()

    render() {
      return (
        <div>
          {/* SearchBar the callback StockSearch is called to set the state for stocks array and selectedStock
            this function is called in the child when the user submits the input */}
          <SearchBar
            selectedStock={this.state.selectedStock}
            chooseStock={this.chooseStock} />

          {/* This will pass an array of stocks to the child and be rendered */}
          <StockList
            stocks={this.state.stocks}
            chooseStock={this.chooseStock} />

          {/* Instead of doing the if/else statement we had earlier and having two
            ALMOST IDENTICAL components (one with onDeleteStock passed as a prop,
            and the other with onAddStock), we now just pass both down as props
            and have a new component (AddRemoveButton) dedicated to handling that logic
             */}
          <StockDetail
            stocks={this.state.stocks}
            selectedStock={this.state.selectedStock}
            onAddStock={this.onAddStock}
            onDeleteStock={this.onDeleteStock} />
      </div>
    )
  }
}

export default withAuth(App);
