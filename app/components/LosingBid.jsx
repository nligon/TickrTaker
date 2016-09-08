import React, {Component} from 'react';

export default class LosingBid extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentBid: undefined,
      currentPrice: undefined
    };
    this.calcPrice = this.calcPrice.bind(this);
    console.log(this.props.item);
  }

  componentDidMount () {
    this.setState({
      currentPrice: '$ ' + this.calcPrice().toFixed(2),
      currentHighestBid: '$ ' + this.props.item.highestBid.toFixed(2),
      timeRemaing: this.calcTime(),
      currentBid: '$ ' + this.props.item.myBid.price.toFixed(2)
    });
    this.interval = setInterval(() => this.setState({
      currentPrice: '$ ' + this.calcPrice().toFixed(2),
      timeRemaing: this.calcTime()
    }), 1000);
    this.calcPrice = this.calcPrice.bind(this);
    this.calcTime = this.calcTime.bind(this);

  }
  componentWillUnmount () {
    this.interval && clearInterval(this.interval);
    this.interval = false;
  }

  calcPrice () {

    var cal = ((this.props.item.item.startPrice - this.props.item.item.endPrice) /
    ((Date.parse(this.props.item.item.endDate) + 2.592e+9) - Date.parse(this.props.item.item.startDate))) * (Date.parse(this.props.item.item.endDate) + 2.592e+9 - Date.now());
    return cal;
  }

  calcTime () {
    var duration = Date.parse(this.props.item.item.endDate) + 2.592e+9 - Date.now();
    var seconds = parseInt((duration / 1000) % 60);
    var minutes = parseInt((duration / (1000 * 60)) % 60);
    var hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    var days = parseInt(((duration) / (1000 * 60 * 60 * 24)) % 365);

    days = (days < 10) ? '0' + days : days;
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    return days + ' days  ' + hours + ':' + minutes + ':' + seconds + ' hours';
  }

  render () {
    var button;
    return (
      <div style = {{margin: '20px', width: '400px', textAlign: 'center'}} className='auction-entry-container col-md'>
        <h4>{this.props.item.item.title || 'Sample Title'}</h4>

        <div>
          <img src={'http://www.officeshop.co.nz/shop/494-664-large/account-overdue-dixon-stamp.jpg'}></img>
        </div>
        <table style= {{width: '100%', textAlign: 'center', marginBottom: '20px'}}>
          <tbody>
          <tr>
            <td><small>Time Left: </small></td><td><small>{this.state.timeRemaing}</small></td>
          </tr>
          <tr>
            <td>Current Price: </td><td>{this.state.currentPrice}</td>
          </tr>
          <tr>
            <td>Highest Bid: </td><td>{this.state.currentHighestBid}</td>
          </tr>
          <tr>
            <td>Current Bid: </td><td>{this.state.currentBid}</td>
          </tr>
          </tbody>
        </table>
        <button type='button' className='btn btn-primary'> Make Another Bid </button>       
      </div>
    );
  }
}