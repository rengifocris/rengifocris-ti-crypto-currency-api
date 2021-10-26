'use strict';

const ListCurrency = require('../../application/use_cases/ListCurrency');
const CreateCurrency = require('../../application/use_cases/CreateCurrency');
const UpdateCurrency = require('../../application/use_cases/UpdateCurrency');
const GetLecturesBySymbol = require('../../application/use_cases/GetLecturesBySymbol');

module.exports = {

    async createCurrencyPair(request, h) {

        // Context
        const serviceLocator = request.server.app.serviceLocator;

        // Input
        const { symbol } = request.payload;


        if (symbol !== undefined && symbol !== null && symbol !== '') {

            // Treatment
            const currencyPair = await CreateCurrency(symbol, null, serviceLocator);

            // Output
            return serviceLocator.currentSerializer.serializeCurrency(currencyPair);
        }

        return h.response(
            serviceLocator
                .currentSerializer
                .serializeLectures(null))
            .code(400)

    },

    async findCurrencyPairs(request) {

        // Context
        const serviceLocator = request.server.app.serviceLocator;

        // Treatment
        const currencyPairs = await ListCurrency(serviceLocator);

        // Output
        return {
            "results": currencyPairs.map(serviceLocator.currentSerializer.serializeCurrency)
        };
    },

    async updateCurrencyPair(request) {

        // Context
        const serviceLocator = request.server.app.serviceLocator;

        // Treatment
        const currencyPairs = await ListCurrency(serviceLocator);

        const currencyPair = await UpdateCurrency(currencyPairs, serviceLocator);

        // Output
        if (currencyPair) {
            return serviceLocator.currentSerializer.serializeCurrencyWithVersion(currencyPair);
        }
        return serviceLocator.currentSerializer.serializeCurrencyWithVersion(null);

    },


    async getLecturesAvegareForACurrencyPair(request, h) {

        // Context
        const serviceLocator = request.server.app.serviceLocator;

        // Input
        const { symbol, lectures } = request.query;

        const symbolExists = symbol !== undefined && symbol !== null && symbol !== '';
        const lecturesExist = lectures !== undefined && lectures !== null && lectures !== '';

        if (symbolExists && lecturesExist && !isNaN(lectures) ) {
            // Treatment
            const currencyLectureSymbol = await GetLecturesBySymbol(symbol, lectures, serviceLocator);
            
            return serviceLocator.currentSerializer.serializeLectures(currencyLectureSymbol);
        }

        return h.response(
            serviceLocator
                .currentSerializer
                .serializeLectures(null))
            .code(400)
    }


};
