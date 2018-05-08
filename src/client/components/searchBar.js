import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stockSymbol: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
   }

    handleChange(e) {
        // The setState will call render function that will set the stock, and then the stock will be assigned to value input.
        this.setState({stockSymbol: e.target.value});       
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSearchTermChange(this.state.stockSymbol);
    }

    render() {
        return (
            <div className="search-bar">
                <form onSubmit={this.handleSubmit}>                
                    <input                 
                    size = {120}
                    value = {this.state.stockSymbol}
                    onChange = {this.handleChange}
                    />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default SearchBar;