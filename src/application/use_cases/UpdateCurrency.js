'use strict';

const Currency = require('../../domain/Currency');

module.exports = async (currencyPairs = [], { currencyRepository, currencyPairRepositoryBinanceApi }) => {

    if (currencyPairs.length > 0) {

        const newAveragePrices = [];
        const averagePrice = await currencyPairRepositoryBinanceApi.get(currencyPairs[0]);

        for (const pair of currencyPairs) {

            let version = pair.version !== undefined && pair.version !== null? pair.version : [];

            version.push({
                averagePrice: averagePrice.price,
                registeredDate: new Date()
            });

            const currency = new Currency(pair.id, pair.symbol, version);

            newAveragePrices.push(await currencyRepository.merge(currency));

        }

        return newAveragePrices;
    }

    return;
};
