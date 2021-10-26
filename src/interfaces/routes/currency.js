'use strict';

const CurrencyController = require('../controllers/CurrencyController');

module.exports = {
    name: 'pairs',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/pairs',
                handler: CurrencyController.findCurrencyPairs,
                options: {
                    description: 'List all currency pairs',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/average',
                handler: CurrencyController.getLecturesAvegareForACurrencyPair,
                options: {
                    description: 'Get currency pairs average for a symbol for N last lectures',
                    tags: ['api'],
                },
            },
            {
                method: 'PUT',
                path: '/getBinanceAvgPrice',
                handler: CurrencyController.updateCurrencyPair,
                options: {
                    description: 'Update all currency pairs',
                    tags: ['api'],
                },
            },
            {
                method: 'POST',
                path: '/pairs',
                handler: CurrencyController.createCurrencyPair,
                options: {
                    description: 'Create a currency pair',
                    tags: ['api'],
                },
            }
        ]);
    }
};