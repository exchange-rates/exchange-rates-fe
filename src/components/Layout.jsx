import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, getCurrentFXRate, getFXRateByDate } from '../actions/fxActions';
import { UPDATE_FIRST_CURRENCY, UPDATE_SECOND_CURRENCY, REVERSE_CURRENCY } from '../reducers/fxReducer';
import ResultBox from './ResultBox';

export class Layout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    getCurrencies: PropTypes.func.isRequired,
    getCurrentFXRate: PropTypes.func.isRequired,
    getFXRateByDate: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    firstCurrency: PropTypes.string.isRequired,
    secondCurrency: PropTypes.string.isRequired,
    currencies: PropTypes.array.isRequired,
    rate: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    props.getCurrencies();
    props.getCurrentFXRate();

    this.handleFirstSelect = this.handleFirstSelect.bind(this);
    this.handleSecondSelect = this.handleSecondSelect.bind(this);
    this.handleSelectDay = this.handleSelectDay.bind(this);
  }

  handleFirstSelect(e) {
    this.props.dispatch({
      type: UPDATE_FIRST_CURRENCY,
      value: e.target.value,
    });
  }

  handleSecondSelect(e) {
    this.props.dispatch({
      type: UPDATE_SECOND_CURRENCY,
      value: e.target.value,
    });
  }

  handleSelectDay(e) {
    this.props.getFXRateByDate(e.target.value);
  }

  createSecondSelect() {
    const { currencies, firstCurrency, secondCurrency } = this.props;

    if (!firstCurrency) return '';

    return (
      <select onChange={this.handleSecondSelect} value={secondCurrency}>
        <option>Select Second Currency</option>
        {Object.keys(currencies)
          .filter(currency => currency !== firstCurrency)
          .map(currency => <option key={currency} value={currency}>{currencies[currency]}</option>)}
      </select>
    );
  }

  render() {
    const { currencies, firstCurrency, rate, secondCurrency, dispatch, date } = this.props;

    return (
      <div>
        <select onChange={this.handleFirstSelect} value={firstCurrency}>
          <option>Select Currency</option>
          {Object
            .keys(currencies)
            .map(currency =>
              <option key={currency} value={currency}>{currencies[currency]}</option>)}
        </select>
        {firstCurrency && <span> Compare with </span>}
        {this.createSecondSelect()}
        <br />
        <span>Select the day you want: </span>
        <input type="date" onChange={this.handleSelectDay} value={date} />
        <br />
        {firstCurrency && secondCurrency &&
          <button onClick={() => dispatch({ type: REVERSE_CURRENCY })}>Reverse</button>
        }
        <ResultBox
          rate={rate}
          date={date}
          firstCurrency={currencies[firstCurrency]}
          secondCurrency={currencies[secondCurrency]}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ fx: { currencies, firstCurrency, secondCurrency, rate, date } }) =>
  ({ currencies, firstCurrency, secondCurrency, rate, date });

export default connect(mapStateToProps, {
  getCurrencies,
  getCurrentFXRate,
  getFXRateByDate,
})(Layout);
