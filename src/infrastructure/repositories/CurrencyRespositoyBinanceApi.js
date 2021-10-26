'use strict';

const axios = require('axios');

const BinanceAverage = require('../../domain/BinanceAverage');
const BinanceAverageRepository = require('../../domain/BinanceAverageRepository');
const {URL, TYPE, VERSION, ENDPOINT, PARAMETER } = require('../config/constants').BINANCE_API;
const { QUESTION_MARK, SLASH, EQUALS } = require('../config/constants');

const getCurrentAveragePrice = async (symbol) => {

    const BINANCE_API_URL = URL+ SLASH + TYPE + SLASH + VERSION + SLASH + ENDPOINT + QUESTION_MARK + PARAMETER + EQUALS;

    let currentAveragePrice = '';

    try {
        const response = await axios.get(BINANCE_API_URL + symbol);
        currentAveragePrice = response.data;
    } catch (err) {
        console.log(err);
    }

    return new BinanceAverage(currentAveragePrice.price, currentAveragePrice.min);
}

module.exports = class extends BinanceAverageRepository {

    constructor() {
        super();
    }

    async get(currencyEntity) {

        if (currencyEntity !== undefined) {
            const { symbol } = currencyEntity;
            let averagePrice = await getCurrentAveragePrice(symbol);

            return averagePrice;
        }

        return;
    }
};
