import React, { Component } from 'react';

// This Component's takes in stocks and selectedStock as props, and
// decides whether to render the the Add or Remove Button
const AddRemoveButton = props => {
  if (props.stocks.includes(props.selectedStock)) {
    return (
      <div className="Delete">
        <button type="button" onClick={() => props.onDeleteStock(props.selectedStock)}>
          Delete
        </button>
      </div>
    );
  } else {
    return (
      <div className="Add">
        <button type="button" onClick={() => props.onAddStock(props.selectedStock)}>
          Add
        </button>
      </div>
    );
  }
}

export default AddRemoveButton;
