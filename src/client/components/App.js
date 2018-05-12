import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './searchBar';
import StockList from './StockList';
import StockDetail from './StockDetail';
import AuthService from './AuthService';
import withAuth from './withAuth';
import _ from 'lodash';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stocks: [],
            selectedStock: '',
            // this flag is used to switch the render delete or add button in the StockDetail
            flag: false
        }

        this.stockSearch = this.stockSearch.bind(this);
        this.onAddStock  = this.onAddStock.bind(this);
        this.chooseStock  = this.chooseStock.bind(this);
        this.onDeleteStock  = this.onDeleteStock.bind(this);
    }

    // delete Stock function
    onDeleteStock(selectedStock) {
        let newArray = [...this.state.stocks];
        // use lodash to remove the specific stock from the array 
        newArray = _.pull(newArray, selectedStock);
        selectedStock = newArray[0];

        this.setState({
            stocks: newArray,
            flag: false,
            selectedStock
        },  () => {
            // print out the state to monitor it
            console.log("state ", this.state.stocks)
        })
    }

    // add Stock function
    onAddStock(selectedStock) {
        console.log(selectedStock);
        this.setState({
            selectedStock,
            stocks: this.state.stocks.concat(selectedStock)
        })
    }

    // This function is used to select the stock item on the left container and
    // this will render the stock detail on the right container. it is called in the child StockList
    chooseStock(selectedStock) {
        this.setState({
            flag: true,
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

                {/* The selectedStock is passed to the child StockDetail */}
                {this.state.flag ? 
                    <StockDetail flag={this.state.flag} selectedStock = {this.state.selectedStock} onDeleteStock = {this.onDeleteStock}/>
                    :
                    <StockDetail flag={this.state.flag} selectedStock = {this.state.selectedStock} onAddStock = {this.onAddStock}/>
                }                
            </div>

        )
    }
}

export default withAuth(App);
