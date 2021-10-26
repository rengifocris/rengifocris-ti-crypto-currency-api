'use strict';

const Currency = require('../../domain/Currency');
const LectureSymbolAverage = require('../../domain/LectureSymbolAverage');

const calculateAverage = (allAverages) => {

    return allAverages.reduce(
        (a, b) => {
            return a + b;
        }, 0) / allAverages.length;
};


module.exports = async (symbol, lectures, { currencyRepository }) => {

    const currentSymbol = await currencyRepository.get(symbol);

    if ( currentSymbol ) {

        const averagesCollection = currentSymbol
        .version
        .slice(-lectures)
        .map((version) => {
            return Number(version.averagePrice);
        });

       return new LectureSymbolAverage(calculateAverage(averagesCollection), lectures);
    }

    return null;

};
