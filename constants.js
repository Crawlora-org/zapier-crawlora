'use strict';

// Production API base. Crawlora is a structured web-data API; every request is
// authenticated with the `x-api-key` header (added by middleware.addApiKeyHeader).
const BASE_URL = 'https://api.crawlora.net/api/v1';

module.exports = { BASE_URL };
