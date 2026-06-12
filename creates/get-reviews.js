'use strict';

const { apiGet, clean, enc } = require('../util');

const perform = (z, bundle) => {
  const i = bundle.inputData;
  const source = (i.source || 'trustpilot').toLowerCase();
  const id = i.identifier;
  switch (source) {
    case 'appstore':
      return apiGet(z, '/appstore/reviews', clean({ app_id: id, country: i.country, page: i.page }));
    case 'googleplay':
      return apiGet(z, '/googleplay/reviews', clean({ app_id: id, country: i.country }));
    case 'producthunt':
      return apiGet(z, `/producthunt/product/${enc(id)}/reviews`);
    case 'airbnb':
      return apiGet(z, `/airbnb/room/${enc(id)}/reviews`, clean({ page: i.page }));
    case 'trustpilot':
    default:
      return apiGet(z, `/trustpilot/business/${enc(id)}/reviews`, clean({ page: i.page }));
  }
};

module.exports = {
  key: 'get_reviews',
  noun: 'Review',
  display: {
    label: 'Get Reviews',
    description: 'Get public reviews for a business, app, or listing by its identifier from a chosen source.',
  },
  operation: {
    inputFields: [
      {
        key: 'source',
        label: 'Source',
        type: 'string',
        required: true,
        choices: { trustpilot: 'Trustpilot', appstore: 'App Store', googleplay: 'Google Play', producthunt: 'Product Hunt', airbnb: 'Airbnb' },
        default: 'trustpilot',
      },
      {
        key: 'identifier',
        label: 'Identifier',
        type: 'string',
        required: true,
        helpText: 'Trustpilot: business domain/slug · App Store: numeric app ID · Google Play: package name · Product Hunt: product ID · Airbnb: room ID.',
      },
      { key: 'country', label: 'Country', type: 'string', helpText: 'App Store / Google Play only.' },
      { key: 'page', label: 'Page', type: 'integer', default: '1' },
    ],
    perform,
    sample: { reviews: [{ author: 'Jane D.', rating: 5, title: 'Great', text: 'Loved it.', date: '2026-05-01' }] },
  },
};
