'use strict';

const Currency = require('../../domain/Currency');
const MongooseCurrency = require('../orm/mongoose/schemas/Currency');
const CurrencyRepository = require('../../domain/CurrencyRepository');

module.exports = class extends CurrencyRepository {

  constructor() {
    super();
  }

  async persist(currencyEntity) {
    const { symbol, version } = currencyEntity;

    const mongooseCurrency = new MongooseCurrency({ symbol, version });
    await mongooseCurrency.save();
    return new Currency(mongooseCurrency.id, mongooseCurrency.symbol, mongooseCurrency.version);
  }

  async merge(currencyEntity) {
    const { id, symbol, version } = currencyEntity;
    const mongooseCurrency = await MongooseCurrency.findByIdAndUpdate(id, { symbol, version });
    return new Currency(mongooseCurrency.id, mongooseCurrency.symbol, mongooseCurrency.version);
  }

  async find() {
    const mongooseCurrencies = await MongooseCurrency.find();
    return mongooseCurrencies.map((mongooseCurrency) => {
      return new Currency(mongooseCurrency.id, mongooseCurrency.symbol, mongooseCurrency.version);
    });
  }

  async get(currencyEntitySymbol) {

    let currencyEntity = {};
    const mongooseCurrency = await MongooseCurrency.findOne(
      { symbol: currencyEntitySymbol },
      (error, document) => {
        if (document) {
          currencyEntity = document;
        }
      }
    );

    if (mongooseCurrency)
    {
      return new Currency(mongooseCurrency.id, mongooseCurrency.symbol, mongooseCurrency.version);
    }
    return null;

  }

};
