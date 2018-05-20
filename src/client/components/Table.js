import React, { Component } from 'react';
import AddRemoveButton from './AddRemoveButton';

// Functional stateless component to render table based on props
const Table = (props) => {
  return (
    <div id={props.symbol}>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>Stock Symbol</th>
            <th>Date</th>
            <th>Open </th>
            <th>High </th>
            <th>Low </th>
            <th>Close </th>
            <th>Adjusted Close </th>
            <th>Volume </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {props.selectedStock} </td>
            <td> {props.stockDate} </td>
            <td> {props.open} </td>
            <td> {props.high} </td>
            <td> {props.low} </td>
            <td> {props.close} </td>
            <td> {props.adjustedClose} </td>
            <td> {props.volume} </td>
            <td>
              <AddRemoveButton
                stocks={props.stocks}
                selectedStock={props.selectedStock}
                onAddStock={props.onAddStock}
                onDeleteStock={props.onDeleteStock}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    )
}


export default Table;
