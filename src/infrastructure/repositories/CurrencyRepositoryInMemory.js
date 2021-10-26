'use strict';

const Currency = require('../../domain/Currency');
const CurrencyRepository = require('../../domain/CurrencyRepository');

module.exports = class extends CurrencyRepository {

  _initializeRepositoryWithTwoCurrency() {
    const john = new Currency(null, 'BTCUSDT', [{ averagePrice: '62501.79445502', registeredDate: Date.now() }]);
    const jane = new Currency(null, 'LTCUSDT', [{ averagePrice: '62501.79445502', registeredDate: Date.now() }]);
    this.persist(john).then(() => this.persist(jane));
  }

  _dataAsArray() {
    return Object.keys(this.data).map(key => this.data[key]);
  }


  constructor() {
    super();
    this.index = 1;
    this.data = {};
    this._initializeRepositoryWithTwoCurrency();
  }

  persist(userEntity) {
    const row = Object.assign({}, userEntity);
    const rowId = this.index++;
    row.id = rowId;
    this.data[rowId] = row;
    return Promise.resolve(row);
  }

  find() {
    return Promise.resolve(this._dataAsArray());
  }

  async get(currencyEntitySymbol) {

    console.log(this.data)
    console.log(currencyEntitySymbol)

    return Promise.resolve(this.data[currencyEntitySymbol]);

    /*let currencyEntity = {};
    const mongooseCurrency = await MongooseCurrency.findOne(
      { symbol: currencyEntitySymbol },
      (error, document) => {
        if (document) {
          currencyEntity = document;
        }
      }
    );*/

  }

};
