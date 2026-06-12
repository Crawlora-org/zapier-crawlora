'use strict';

const { apiPost, clean } = require('../util');

// Diagnostic only: reports whether a public page is reachable and what bot-protection
// signals it presents. This is for authorized public-data work — not for bypassing
// any protection.
const perform = (z, bundle) =>
  apiPost(z, '/diagnostics/antibot-check', clean({
    url: bundle.inputData.url,
    fast: bundle.inputData.fast !== false,
  }));

module.exports = {
  key: 'check_site_accessibility',
  noun: 'Check',
  display: {
    label: 'Check Site Accessibility',
    description: 'Check whether a public web page is reachable and what bot-protection signals it presents.',
  },
  operation: {
    inputFields: [
      { key: 'url', label: 'Website URL', type: 'string', required: true, helpText: 'The public URL to check, e.g. `https://example.com`.' },
      { key: 'fast', label: 'Fast check', type: 'boolean', default: 'true', helpText: 'Return at the first conclusive signal instead of an exhaustive sweep.' },
    ],
    perform,
    sample: { url: 'https://example.com', reachable: true, protection: 'none', status_code: 200 },
  },
};
