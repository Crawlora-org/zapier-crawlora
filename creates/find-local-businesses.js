'use strict';

const { apiGet, apiPost, clean } = require('../util');

const perform = (z, bundle) => {
  const i = bundle.inputData;
  const source = (i.source || 'live').toLowerCase();
  if (source === 'dataset') {
    return apiGet(z, '/datasets/google-map-businesses/search', clean({
      q: i.query, country: i.country, city: i.city,
    }));
  }
  return apiPost(z, '/google/map/search', clean({
    keyword: i.query, country: i.country, language: i.language,
  }));
};

module.exports = {
  key: 'find_local_businesses',
  noun: 'Business',
  display: {
    label: 'Find Local Businesses',
    description: 'Find local businesses for a search query (live map search or the stored business dataset).',
  },
  operation: {
    inputFields: [
      { key: 'query', label: 'Search query', type: 'string', required: true, helpText: 'e.g. "coffee shops in Austin".' },
      { key: 'source', label: 'Source', type: 'string', choices: { live: 'Live map search', dataset: 'Stored business dataset' }, default: 'live' },
      { key: 'country', label: 'Country', type: 'string', default: 'us' },
      { key: 'language', label: 'Language', type: 'string', default: 'en', helpText: 'Live search only.' },
      { key: 'city', label: 'City', type: 'string', helpText: 'Stored-dataset source only.' },
    ],
    perform,
    sample: { results: [{ name: 'Example Coffee', rating: 4.6, address: '123 Main St, Austin, TX', phone: '+1 512-555-0100' }] },
  },
};
