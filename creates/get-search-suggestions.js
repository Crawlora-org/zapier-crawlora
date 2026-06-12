'use strict';

const { apiGet, clean } = require('../util');

const perform = (z, bundle) => {
  const engine = (bundle.inputData.engine || 'google').toLowerCase() === 'bing' ? 'bing' : 'google';
  return apiGet(z, `/${engine}/suggest`, clean({
    q: bundle.inputData.q,
    count: bundle.inputData.count,
    country: bundle.inputData.country,
  }));
};

module.exports = {
  key: 'get_search_suggestions',
  noun: 'Suggestion',
  display: {
    label: 'Get Search Suggestions',
    description: 'Get autocomplete query suggestions for a search term.',
  },
  operation: {
    inputFields: [
      { key: 'q', label: 'Query', type: 'string', required: true },
      { key: 'engine', label: 'Engine', type: 'string', choices: { google: 'Google', bing: 'Bing' }, default: 'google' },
      { key: 'count', label: 'Max suggestions', type: 'integer' },
      { key: 'country', label: 'Country', type: 'string', default: 'us' },
    ],
    perform,
    sample: { query: 'coffee', suggestions: [{ position: 1, query: 'coffee near me' }] },
  },
};
