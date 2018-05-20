import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends Component {
  constructor(props) {
    console.log('SearchBar constructor called');
    super(props);
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.chooseStock(this.state.inputValue);
    this.setState({inputValue: ''}); // reset input field
  }

  render() {
    return (
      <div className="search-bar">
        <form onSubmit={this.handleSubmit}>
          <input
            size={120}
            value={this.state.inputValue}
            onChange={this.handleChange} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default SearchBar;
