const mongoose = require('../mongoose');
const currencySchema = new mongoose.Schema({
  symbol: String,
  version: [
    {
      averagePrice: String,
      registeredDate: Date
    }
  ],
});

module.exports = mongoose.model('Currency', currencySchema);
