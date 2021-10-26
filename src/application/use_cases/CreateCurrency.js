'use strict';

const Currency = require('../../domain/Currency');

module.exports = (symbol, version, { currencyRepository }) => {
  const currency = new Currency(null, symbol, version);
  return currencyRepository.persist(currency);
};
