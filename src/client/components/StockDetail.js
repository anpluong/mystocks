import React, {Component} from 'react';
import axios from 'axios';

const apiKey = '6H8OCBWU5LYNFJOH';
const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&apikey=${apiKey}&symbol=`;

// const StockDetail = ({selectedStock}) => {

class StockDetail extends Component {
    // when the selectedStock is not defined

    constructor(props) {
        super(props);

        this.state = {
            stockLabel: '',
            stockDate: '',
            stockPrice: ''
        }      
    }

    // // a function to make axios to get the stock
    //  componentDidMount() {        
    //         axios.get(URL + "FB")         
    //         .then((response) => {         
                
    //         var stockDate = response.data["Meta Data"]["3. Last Refreshed"];
    //         //     // var newDate = stockDate.substr(0, stockDate.indexOf(' '));            
    //         this.setState({
    //             stockS: stockDate
    //         }, () => {
    //             console.log(stockDate)
    //         })            
    // //    })
    //    })
    // }

    componentWillReceiveProps(nextProps) {
        axios.get(URL + nextProps.selectedStock)         
        .then((response) => {         
            var stockDate = response.data["Meta Data"]["3. Last Refreshed"];
            var stockPrice = response.data["Time Series (Daily)"][stockDate]["4. close"];
            this.setState({
            stockLabel: nextProps.selectedStock,
            stockDate,
            stockPrice
        })
    }) 
    }
    
    render() {
        if (!this.props.selectedStock) {
            return <div className="col-md-8">Please select a stock quote...</div>
        }

        return (
            <div className="col-md-8">
                {/* <p>{this.stockSearch(this.props.selectedStock)}</p> */}
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>Stock Symbol</th>
                            <th>Date</th>
                            <th>Open Price </th>
                            {/*<th>Close Price </th> */}
                        </tr>
                    </thead>
                    <tbody>                      
                        <tr>
                            <td>
                                {this.state.stockLabel}
                            </td>
                            <td>
                                {this.state.stockDate}
                            </td>
                            <td>
                                {this.state.stockPrice}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default StockDetail;