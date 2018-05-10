import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './searchBar';
import StockList from './StockList'
import StockDetail from './StockDetail'


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stocks: [],
            selectedStock: ''
        }
        this.stockSearch = this.stockSearch.bind(this);
        this.onDeleteStock = this.onDeleteStock.bind(this);
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

    onDeleteStock(seletedStock) {
        console.log(seletedStock);
        const stocks = this.state.stocks.filter(r => r != seletedStock) 
        this.setState({
            selectedStock: stocks[0],
            stocks
        })
     //   console.log(seletedStock)
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
                <StockDetail selectedStock = {this.state.selectedStock} onDeleteStock = {this.onDeleteStock}/>
            </div>

        )
    }
}

export default App;