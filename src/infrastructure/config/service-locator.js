'use strict';

const constants = require('./constants');
const environment = require('./environment');
const CurrencySerializer = require('../../interfaces/serializers/CurrencySerializer');

function buildBeans() {

  const beans = {
    currentSerializer: new CurrencySerializer(),
  };

  if (environment.database.dialect === constants.SUPPORTED_DATABASE.IN_MEMORY) {
    const CurrencyRepositoryInMemory = require('../repositories/CurrencyRepositoryInMemory');
    beans.currencyRepository = new CurrencyRepositoryInMemory();
  } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {

    const CurrencyRepositoryMongo = require('../repositories/CurrencyRepositoryMongo');
    const CurrencyRespositoyBinanceApi = require('../repositories/CurrencyRespositoyBinanceApi');

    beans.currencyRepository = new CurrencyRepositoryMongo();
    beans.currencyPairRepositoryBinanceApi = new CurrencyRespositoyBinanceApi();

  }

  return beans;
}

module.exports = buildBeans();
