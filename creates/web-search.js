'use strict';

const { BASE_URL } = require('../constants');

// Normalize each engine's native result shape into one flat list so downstream
// Zap steps see the same fields regardless of which engine the user picked.
const normalize = {
  bing: (data) =>
    (data.results || []).map((r) => ({
      position: r.position,
      title: r.title,
      link: r.url,
      snippet: r.description || '',
      source: r.hostname || '',
    })),
  brave: (data) =>
    (data.results || []).map((r) => ({
      position: r.position,
      title: r.title,
      link: r.url,
      snippet: r.description || '',
      source: r.hostname || '',
    })),
};

const perform = async (z, bundle) => {
  const i = bundle.inputData;
  const engine = (i.engine || 'bing').toLowerCase();
  const q = i.q;
  const country = i.country || 'us';
  // Bing/Brave require a `ll-cc` language code (e.g. en-us) and reject bare codes
  // like `en`; send it only when the user provides that form, else let the engine
  // use its default.
  const lang = /^[a-z]{2}-[a-z]{2}$/i.test(i.language || '') ? i.language : undefined;
  const limit = i.limit || 10;
  const page = i.page || 1;

  let response;
  if (engine === 'brave') {
    const params = { q, country, offset: page > 1 ? page - 1 : 0 };
    if (lang) params.lang = lang;
    response = await z.request({ url: `${BASE_URL}/brave/search`, method: 'GET', params });
  } else {
    const params = { q, page, count: limit, country };
    if (lang) params.lang = lang;
    response = await z.request({ url: `${BASE_URL}/bing/search`, method: 'GET', params });
  }

  const data = (response.data && response.data.data) || {};
  return {
    query: q,
    engine,
    results: (normalize[engine] || normalize.bing)(data),
  };
};

module.exports = {
  key: 'web_search',
  noun: 'Search',
  display: {
    label: 'Web Search',
    description:
      'Run a web search and return ranked results (title, link, snippet) as structured data.',
  },
  operation: {
    inputFields: [
      {
        key: 'q',
        label: 'Search query',
        type: 'string',
        required: true,
        helpText: 'The text to search for.',
      },
      {
        key: 'engine',
        label: 'Search engine',
        type: 'string',
        choices: { bing: 'Bing', brave: 'Brave' },
        default: 'bing',
        helpText: 'Which search engine to query.',
      },
      {
        key: 'country',
        label: 'Country',
        type: 'string',
        default: 'us',
        helpText: 'Two-letter country code, e.g. `us`, `gb`, `de`.',
      },
      {
        key: 'language',
        label: 'Language',
        type: 'string',
        helpText: 'Optional `ll-cc` language code, e.g. `en-us`, `en-gb`, `de-de`. Leave blank to use the engine default.',
      },
      {
        key: 'limit',
        label: 'Number of results',
        type: 'integer',
        default: '10',
        helpText: 'Results per page (Bing supports up to 50).',
      },
      {
        key: 'page',
        label: 'Page',
        type: 'integer',
        default: '1',
        helpText: '1-based page number.',
      },
    ],
    perform,
    sample: {
      query: 'openai',
      engine: 'bing',
      results: [
        {
          position: 1,
          title: 'OpenAI - Reddit',
          link: 'https://www.reddit.com/r/OpenAI/',
          snippet: "OpenAI is an AI research and deployment company...",
          source: 'www.reddit.com',
        },
      ],
    },
    outputFields: [
      { key: 'query', label: 'Query' },
      { key: 'engine', label: 'Engine' },
      { key: 'results[]position', label: 'Position', type: 'integer' },
      { key: 'results[]title', label: 'Title' },
      { key: 'results[]link', label: 'Link' },
      { key: 'results[]snippet', label: 'Snippet' },
      { key: 'results[]source', label: 'Source' },
    ],
  },
};
