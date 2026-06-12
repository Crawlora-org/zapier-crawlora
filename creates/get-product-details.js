'use strict';

const { apiGet, clean, enc } = require('../util');

const perform = (z, bundle) => {
  const i = bundle.inputData;
  const source = (i.source || 'amazon').toLowerCase();
  const id = i.identifier;
  switch (source) {
    case 'ebay':
      return apiGet(z, `/ebay/item/${enc(id)}`);
    case 'appstore':
      return apiGet(z, '/appstore/app', clean({ app_id: id, country: i.country }));
    case 'googleplay':
      return apiGet(z, '/googleplay/app', clean({ app_id: id, country: i.country }));
    case 'amazon':
    default:
      return apiGet(z, `/amazon/product/${enc(id)}`);
  }
};

module.exports = {
  key: 'get_product_details',
  noun: 'Product',
  display: {
    label: 'Get Product Details',
    description: 'Get normalized details for a product or app by its identifier from a chosen source.',
  },
  operation: {
    inputFields: [
      {
        key: 'source',
        label: 'Source',
        type: 'string',
        required: true,
        choices: { amazon: 'Amazon', ebay: 'eBay', appstore: 'App Store', googleplay: 'Google Play' },
        default: 'amazon',
      },
      {
        key: 'identifier',
        label: 'Identifier',
        type: 'string',
        required: true,
        helpText: 'Amazon: ASIN · eBay: item ID · App Store: bundle ID (e.g. com.company.app) · Google Play: package name.',
      },
      { key: 'country', label: 'Country', type: 'string', helpText: 'App Store / Google Play only.' },
    ],
    perform,
    sample: { title: 'Example Product', price: 19.99, currency: 'USD', rating: 4.5, url: 'https://example.com/p/1' },
  },
};
