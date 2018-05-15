import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './searchBar';
import StockList from './StockList';
import StockDetail from './StockDetail';
import AuthService from './AuthService';
import withAuth from './withAuth';
import axios from 'axios';
import _ from 'lodash';


class App extends Component {

    constructor(props) {
        super(props);

        // I removed the flag for a more simple check.
        // See further below the props that get passed to <StockDetail />
        this.state = {
            stocks: [],
            selectedStock: ''
        }

        this.stockSearch = this.stockSearch.bind(this);
        this.onDeleteStock = this.onDeleteStock.bind(this);
        this.onAddStock  = this.onAddStock.bind(this);
        this.chooseStock  = this.chooseStock.bind(this);
        this.Auth = new AuthService();
    }


    componentDidMount() {
      console.log('componentDidMount');
      let profile = this.Auth.getProfile();
      console.log('profile: ', profile);
      axios.get(`/getMyStocks?id=${profile.usr}`)
        .then(response => {
          console.log('server response: ', response);
          this.setState({
            stocks: response.data.stockSymbols,
            selectedStock: response.data.stockSymbols[0], // Initialize as the users first saved stock
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // delete Stock function
    onDeleteStock(selectedStock) {
        axios.post('/removeStock', {
            symbol: selectedStock,
            usr_id: this.props.jwt.usr
          })
          .then(response => {
            console.log(response);
            let newArray = [...this.state.stocks];
            // use lodash to remove the specific stock from the array
            newArray = _.pull(newArray, selectedStock);
            selectedStock = newArray[0];

            this.setState({
                stocks: newArray,
                selectedStock
            },  () => {
                // print out the state to monitor it
                console.log("state ", this.state.stocks)
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    // add Stock function
    onAddStock(selectedStock) {
      console.log(selectedStock);
      console.log('profile: ', this.Auth.getProfile());
      axios.post('/saveStock', {
          symbol: selectedStock,
          usr_id: this.props.jwt.usr
        })
        .then(response => {
          this.setState({
              selectedStock,
              stocks: this.state.stocks.concat(selectedStock)
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // This function is used to select the stock item on the left container and
    // this will render the stock detail on the right container. it is called in the child StockList
    chooseStock(selectedStock) {
        this.setState({
            selectedStock
        })
    }

    // this function is used to search a stock and it is called in the child SearchBar
    stockSearch(stockSymbol) {
        this.setState({
            selectedStock: stockSymbol
        })
    }

    render() {

        return (
            <div>
                {/* SearchBar the callback StockSearch is called to set the state for stocks array and selectedStock
                this function is called in the child when the user submits the input */}
                <SearchBar onSearchTermChange = {this.stockSearch}/>

                {/* This will pass an array of stocks to the child and be rendered */}
                <StockList stocks = {this.state.stocks} chooseStock = {this.chooseStock} />

                {/* IF selected stock is in the left column, pass onDeleteStock, ELSE pass onAddStock */}
                {this.state.stocks.includes(this.state.selectedStock) ?
                    <StockDetail stocks={this.state.stocks} selectedStock = {this.state.selectedStock} onDeleteStock = {this.onDeleteStock}/>
                    :
                    <StockDetail stocks={this.state.stocks} selectedStock = {this.state.selectedStock} onAddStock = {this.onAddStock}/>
                }
            </div>

        )
    }
}

export default withAuth(App);
