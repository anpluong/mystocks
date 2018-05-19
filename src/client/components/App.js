import React, {Component} from 'react';
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
      let usr_id = this.props.jwt.usr;
      axios.get(`/getMyStocks?id=${usr_id}`)
        .then(response => {
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
            usr_id: this.props.jwt.usr,
            symbol: selectedStock
          })
          .then(response => {
            let oldStocks = [...this.state.stocks];
            let newStocks = _.pull(oldStocks, selectedStock);
            this.setState({
                stocks: newStocks,
                selectedStock: newStocks[0]
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
                    <StockDetail
                      stocks={this.state.stocks}
                      selectedStock = {this.state.selectedStock}
                      onDeleteStock = {this.onDeleteStock}/>
                    :
                    <StockDetail
                      stocks={this.state.stocks}
                      selectedStock = {this.state.selectedStock}
                      onAddStock = {this.onAddStock}/>
                }
            </div>

        )
    }
}

export default withAuth(App);
