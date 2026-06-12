'use strict';

const { BASE_URL } = require('../constants');

const perform = async (z, bundle) => {
  const i = bundle.inputData;

  const body = {
    url: i.url,
    formats: i.formats && i.formats.length ? i.formats : ['markdown'],
    only_main_content: i.only_main_content !== false,
    render: i.render || 'auto',
  };
  if (i.max_age != null && i.max_age !== '') body.max_age = i.max_age;
  if (i.wait_for != null && i.wait_for !== '') body.wait_for = i.wait_for;

  const response = await z.request({
    url: `${BASE_URL}/web/scrape`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  // Standard Crawlora envelope: { code, msg, data: { ... } }
  return (response.data && response.data.data) || response.data || {};
};

module.exports = {
  key: 'get_page_content',
  noun: 'Page',
  display: {
    label: 'Get Page Content',
    description:
      'Fetch a public web page and return it as clean Markdown, HTML, links, or page metadata.',
  },
  operation: {
    inputFields: [
      {
        key: 'url',
        label: 'Website URL',
        type: 'string',
        required: true,
        helpText: 'The full URL to fetch, e.g. `https://example.com/page`.',
      },
      {
        key: 'formats',
        label: 'Output formats',
        type: 'string',
        list: true,
        choices: {
          markdown: 'Markdown',
          html: 'HTML',
          raw_html: 'Raw HTML',
          links: 'Links',
          metadata: 'Metadata',
        },
        default: 'markdown',
        helpText: 'One or more formats to return. Defaults to Markdown.',
      },
      {
        key: 'only_main_content',
        label: 'Main content only',
        type: 'boolean',
        default: 'true',
        helpText: 'Strip navigation, footers, and boilerplate so you keep just the article body.',
      },
      {
        key: 'render',
        label: 'Rendering',
        type: 'string',
        choices: {
          auto: 'Auto (recommended)',
          http: 'HTTP only',
          browser: 'Headless browser',
          unblocker: 'Unblocker',
        },
        default: 'auto',
        helpText: 'Auto starts fast and escalates to a browser only if the page needs it.',
      },
      {
        key: 'max_age',
        label: 'Max cache age (ms)',
        type: 'integer',
        helpText:
          'If above 0, return a cached copy newer than this many milliseconds to save credits.',
      },
      {
        key: 'wait_for',
        label: 'Wait for (ms)',
        type: 'integer',
        helpText: 'Extra time to wait after load when using browser rendering.',
      },
    ],
    perform,
    sample: {
      markdown: '# Example Domain\n\nThis domain is for use in illustrative examples...',
      links: ['https://www.iana.org/domains/example'],
      metadata: {
        title: 'Example Domain',
        description: '',
        language: 'en',
        status_code: 200,
        source_url: 'https://example.com',
        content_type: 'text/html; charset=UTF-8',
      },
      scrape: { method: 'http', escalated: false },
    },
    outputFields: [
      { key: 'markdown', label: 'Markdown' },
      { key: 'html', label: 'HTML' },
      { key: 'links[]', label: 'Links' },
      { key: 'metadata__title', label: 'Title' },
      { key: 'metadata__description', label: 'Description' },
      { key: 'metadata__language', label: 'Language' },
      { key: 'metadata__status_code', label: 'Status code', type: 'integer' },
      { key: 'metadata__final_url', label: 'Final URL' },
      { key: 'metadata__content_type', label: 'Content type' },
      { key: 'scrape__method', label: 'Fetch method' },
      { key: 'scrape__escalated', label: 'Escalated to browser', type: 'boolean' },
    ],
  },
};
