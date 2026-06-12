'use strict';

const { apiGet, enc } = require('../util');

const perform = (z, bundle) => {
  const i = bundle.inputData;
  const source = (i.source || 'yahoo').toLowerCase();
  const symbol = i.symbol;
  switch (source) {
    case 'google':
      return apiGet(z, `/google/finance/quote/${enc(symbol)}`);
    case 'coingecko':
      return apiGet(z, `/coingecko/coin/${enc(symbol)}`);
    case 'yahoo':
    default:
      return apiGet(z, `/yahoo-finance/ticker/${enc(symbol)}/quote`);
  }
};

module.exports = {
  key: 'get_financial_quote',
  noun: 'Quote',
  display: {
    label: 'Get Financial Quote',
    description: 'Get the latest quote for a stock, index, or cryptocurrency from a chosen source.',
  },
  operation: {
    inputFields: [
      {
        key: 'source',
        label: 'Source',
        type: 'string',
        required: true,
        choices: { yahoo: 'Yahoo Finance', google: 'Google Finance', coingecko: 'CoinGecko' },
        default: 'yahoo',
      },
      {
        key: 'symbol',
        label: 'Symbol',
        type: 'string',
        required: true,
        helpText: 'Yahoo: ticker (e.g. `AAPL`) · Google Finance: `AAPL:NASDAQ` · CoinGecko: coin ID (e.g. `bitcoin`).',
      },
    ],
    perform,
    sample: { symbol: 'AAPL', price: 212.45, currency: 'USD', change_percent: 0.82 },
  },
};
