'use strict';

// Inject the Crawlora API key as the `x-api-key` header on every outbound request.
// Crawlora uses `x-api-key`, NOT a Bearer token — same contract as the SDKs/MCP.
const addApiKeyHeader = (request, z, bundle) => {
  request.headers = request.headers || {};
  if (bundle.authData && bundle.authData.api_key) {
    request.headers['x-api-key'] = bundle.authData.api_key;
  }
  return request;
};

// Turn non-2xx responses into clear, user-facing Zapier errors. Runs before core's
// default throw, so it owns error messaging for both the auth test and every action.
const handleError = (response, z) => {
  if (response.status < 400) {
    return response;
  }

  let detail = '';
  try {
    const body =
      response.data && typeof response.data === 'object'
        ? response.data
        : JSON.parse(response.content || '{}');
    detail = body.msg || body.message || body.error || '';
  } catch (err) {
    detail = (response.content || '').slice(0, 200);
  }

  if (response.status === 401 || response.status === 403) {
    throw new z.errors.Error(
      'Your Crawlora API key is missing or invalid. Add a valid key from https://crawlora.net/app/api-keys.',
      'AuthenticationError',
      response.status
    );
  }
  if (response.status === 429) {
    throw new z.errors.ThrottledError(
      'Crawlora rate limit reached. Please retry shortly.',
      30
    );
  }
  throw new z.errors.Error(
    `Crawlora API error ${response.status}${detail ? ': ' + detail : ''}.`,
    'APIError',
    response.status
  );
};

module.exports = { addApiKeyHeader, handleError };
