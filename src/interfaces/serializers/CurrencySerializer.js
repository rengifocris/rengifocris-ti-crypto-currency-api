'use strict';

const _serializeSingleCurrency = (currency) => {
  return {
    'id': currency.id,
    'symbol': currency.symbol,
    
  };
};

const _serializeSingleLectureSymbolAverage = (symbolAverage) => {
  return {
    'average': symbolAverage.average,
    'numberOfLectures': symbolAverage.numberOfLectures,
    
  };
};

const _serializeSingleVersion = (version) => {
  return {
    'averagePrice': version.averagePrice,
    'registeredDate': version.registeredDate,
  };
};

const _serializeSingleCurrencyWithVersion = (currency) => {
  return {
    'id': currency.id,
    'symbol': currency.symbol,
    'version': currency.version.map(_serializeSingleVersion),
  };
};

module.exports = class {

  serializeCurrency(data) {
    if (!data) {
      return {message: 'Expect data to be not undefined nor null'};
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleCurrency);
    }
    return _serializeSingleCurrency(data);
  }

  serializeCurrencyWithVersion(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleCurrencyWithVersion);
    }
    return _serializeSingleCurrencyWithVersion(data);
  }

  serializeLectures(data) {
    if (!data) {
      return {message: 'Expect data to be not undefined nor null'};
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleLectureSymbolAverage);
    }
    return _serializeSingleLectureSymbolAverage(data);
  }

};