import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ResultBox extends Component {
  static propTypes = {
    firstCurrency: PropTypes.string,
    secondCurrency: PropTypes.string,
    rate: PropTypes.number,
    date: PropTypes.string,
  };

  static defaultProps = {
    firstCurrency: '',
    secondCurrency: '',
    rate: null,
    date: '',
  };

  render() {
    const { rate, firstCurrency, secondCurrency, date } = this.props;

    if (!rate) return null;

    const dateString = date ? `For ${date}:` : 'Currently:';

    return (
      <div>
        <p>{dateString}</p>
        <p>One {firstCurrency} equals {rate} {secondCurrency}</p>
      </div>
    );
  }
}
