'use strict';

const { BASE_URL } = require('./constants');

// API Key authentication. The user pastes their Crawlora API key; it is sent as
// the `x-api-key` header on every request (see middleware.addApiKeyHeader).
//
// The connection test is a cheap, key-only GET that succeeds for a valid key and
// returns 401/403 for an invalid one (handled by middleware.handleError, which
// surfaces a friendly "invalid key" message). We use the autocomplete endpoint
// because it is fast, always available, and needs only the API key.
const test = {
  url: `${BASE_URL}/google/suggest`,
  method: 'GET',
  params: { q: 'crawlora' },
};

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'api_key',
      label: 'API Key',
      type: 'password',
      required: true,
      helpText:
        'Find your API key in your [Crawlora dashboard](https://crawlora.net/app/api-keys). ' +
        'New accounts include a free monthly credit allowance — no card required.',
    },
  ],
  test,
  // connectionLabel is intentionally omitted: the endpoint used to test the key does
  // not return an account name or email to label the connection with. Wire it to an
  // account endpoint that returns the account name or email when one is available.
};
