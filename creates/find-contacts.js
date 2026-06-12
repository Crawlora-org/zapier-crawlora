'use strict';

const { BASE_URL } = require('../constants');

const perform = async (z, bundle) => {
  const i = bundle.inputData;

  const body = { url: i.url };
  if (i.max_pages != null && i.max_pages !== '') body.max_pages = i.max_pages;
  if (i.verify != null) body.verify = i.verify !== false;
  if (i.independents_only != null) body.independents_only = i.independents_only === true;

  const response = await z.request({
    url: `${BASE_URL}/contact`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return (response.data && response.data.data) || response.data || {};
};

module.exports = {
  key: 'find_website_contacts',
  noun: 'Contact',
  display: {
    label: 'Find Website Contacts',
    description:
      'Find public contact details (emails, phones, social profiles) for a website by its URL.',
  },
  operation: {
    inputFields: [
      {
        key: 'url',
        label: 'Website URL',
        type: 'string',
        required: true,
        helpText: 'The website to read, e.g. `https://example.com`.',
      },
      {
        key: 'max_pages',
        label: 'Max pages to read',
        type: 'integer',
        default: '5',
        helpText: 'How many pages of the site to read while looking for contact details.',
      },
      {
        key: 'verify',
        label: 'Verify emails',
        type: 'boolean',
        default: 'true',
        helpText: 'Check whether found email addresses are deliverable.',
      },
      {
        key: 'independents_only',
        label: 'Independent sites only',
        type: 'boolean',
        default: 'false',
        helpText:
          'When true, return only the site classification (no read) for chains, social, builders, or directories — a cheap filter.',
      },
    ],
    perform,
    sample: {
      domain: 'example.com',
      domain_type: 'independent',
      emails: [
        {
          address: 'hello@example.com',
          status: 'verified',
          type: 'generic',
          source_page: 'https://example.com/contact',
        },
      ],
      phones: [{ number: '+1 415-555-2671', source_page: 'https://example.com/contact' }],
      socials: [
        {
          network: 'linkedin',
          url: 'https://www.linkedin.com/company/example',
          handle: 'example',
        },
      ],
      crawl_status: 'ok',
      crawled_pages: ['https://example.com/', 'https://example.com/contact'],
    },
    outputFields: [
      { key: 'domain', label: 'Domain' },
      { key: 'domain_type', label: 'Domain type' },
      { key: 'crawl_status', label: 'Crawl status' },
      { key: 'emails[]address', label: 'Email address' },
      { key: 'emails[]status', label: 'Email status' },
      { key: 'emails[]type', label: 'Email type' },
      { key: 'emails[]source_page', label: 'Email source page' },
      { key: 'phones[]number', label: 'Phone number' },
      { key: 'socials[]network', label: 'Social network' },
      { key: 'socials[]url', label: 'Social URL' },
      { key: 'socials[]handle', label: 'Social handle' },
    ],
  },
};
