import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './searchBar';
import StockList from './StockList';
import StockDetail from './StockDetail';
import AuthService from './AuthService';
import withAuth from './withAuth';
import axios from 'axios';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stocks: [], // initialize with user's save stocks
            selectedStock: ''
        }
        this.stockSearch = this.stockSearch.bind(this);
        this.onDeleteStock = this.onDeleteStock.bind(this);
        this.onSaveStock = this.onSaveStock.bind(this);
        this.onRemoveStock = this.onRemoveStock.bind(this);
        this.Auth = new AuthService();
    }

    stockSearch(stockSymbol) {
        this.setState({
            stocks: this.state.stocks.concat(stockSymbol),
            selectedStock: stockSymbol
                },  () => {
                    //  console.log("state ", this.state.selectedStock)
                }
        )
    }


    onDeleteStock(selectedStock) {
        console.log(seletecdStock);
        const stocks = this.state.stocks.filter(r => r != selectedStock)
        this.setState({
            selectedStock: stocks[0],
            stocks
        })
     //   console.log(seletedStock)
    }

    onSaveStock(selectedStock) {
        console.log(selectedStock);
        // THIS REQUEST SHOULD ONLY BE MADE IF THE SELECTED STOCK IS
        // IS NOT ALREADY IN THEIR SAVED STOCKS
        // In other words, only display the save button if the selected stock
        // is not found in this.state.stocks
        console.log('profile: ', this.Auth.getProfile());
        axios.post('/saveStock', {
            symbol: selectedStock,
            usr_id: this.Auth.getProfile().usr
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    onRemoveStock(selectedStock) {
      console.log(selectedStock);
      console.log('profile: ', this.Auth.getProfile());
      axios.post('/removeStock', {
          symbol: selectedStock,
          usr_id: this.Auth.getProfile().usr
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render() {

        return (
            <div>
                {/* SearchBar the callback StockSearch is called to set the state for stocks array and selectedStock
                this function is called in the child when the user submits the input */}
                <SearchBar onSearchTermChange = {this.stockSearch}/>
                {/* This will pass an array of stocks to the child and be rendered */}
                <StockList stocks = {this.state.stocks} />
                {/* The selectedStock is passed to the child StockDetail */}
                <StockDetail
                  selectedStock = {this.state.selectedStock}
                  onDeleteStock = {this.onDeleteStock}
                  onSaveStock = {this.onSaveStock}
                  onRemoveStock = {this.onRemoveStock}
                />
            </div>

        )
    }
}

export default withAuth(App);
