'use strict';

module.exports = {

  SUPPORTED_DATABASE: {
    IN_MEMORY: 'in-memory',
    MONGO: 'mongo',
    DB_URL: 'mongodb+srv://sga:sga@cluster0.7ppfr.mongodb.net/binance-store?retryWrites=true&w=majority',
    DB_LOCAL: 'mongodb://127.0.0.1:27017/binance-store?retryWrites=true&w=majority'

  },
  BINANCE_API: {
    VERSION: 'v3',
    TYPE: 'api',
    ENDPOINT: 'avgPrice',
    PARAMETER: 'symbol',
    URL: 'https://api.binance.com'
  },
  SLASH: "/",
  QUESTION_MARK: "?",
  EQUALS: "=",
  CRON_JOB: {
    EVERY_HOUR: "0 * * * * *",
    NAME: "UPDATE CURRENT AVERAGE PRICE JOB",
    TIME_ZONE: 'Europe/London',
  }
};
