'use strict';

const { apiGet, apiPost, clean } = require('../util');

const perform = (z, bundle) => {
  const i = bundle.inputData;
  const source = (i.source || 'amazon').toLowerCase();
  switch (source) {
    case 'ebay':
      return apiPost(z, '/ebay/search', clean({ keyword: i.query, page: i.page }));
    case 'etsy':
      return apiGet(z, '/etsy/search', clean({ q: i.query, page: i.page }));
    case 'amazon':
    default:
      return apiGet(z, '/amazon/search', clean({ k: i.query, page: i.page }));
  }
};

module.exports = {
  key: 'search_marketplace',
  noun: 'Result',
  display: {
    label: 'Search a Marketplace',
    description: 'Search a marketplace for products matching a query and return the results.',
  },
  operation: {
    inputFields: [
      {
        key: 'source',
        label: 'Marketplace',
        type: 'string',
        required: true,
        choices: { amazon: 'Amazon', ebay: 'eBay', etsy: 'Etsy' },
        default: 'amazon',
      },
      { key: 'query', label: 'Search query', type: 'string', required: true },
      { key: 'page', label: 'Page', type: 'integer', default: '1' },
    ],
    perform,
    sample: { results: [{ title: 'Example Item', price: 24.99, url: 'https://example.com/item/1' }] },
  },
};
