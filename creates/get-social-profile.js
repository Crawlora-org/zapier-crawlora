'use strict';

const { apiGet, clean, enc } = require('../util');

const perform = (z, bundle) => {
  const i = bundle.inputData;
  const source = (i.source || 'youtube').toLowerCase();
  const handle = i.handle;
  switch (source) {
    case 'tiktok':
      return apiGet(z, `/tiktok/profile/${enc(handle)}`);
    case 'instagram':
      return apiGet(z, `/instagram/profile/${enc(handle)}`);
    case 'reddit':
      return apiGet(z, `/reddit/user/${enc(handle)}/posts`, clean({ limit: i.limit }));
    case 'linkedin':
      return apiGet(z, `/linkedin/company/${enc(handle)}`);
    case 'youtube':
    default:
      return apiGet(z, `/youtube/profile/${enc(handle)}`);
  }
};

module.exports = {
  key: 'get_social_profile',
  noun: 'Profile',
  display: {
    label: 'Get Social Profile',
    description: 'Get a public profile (or recent posts) by handle from a chosen social platform.',
  },
  operation: {
    inputFields: [
      {
        key: 'source',
        label: 'Platform',
        type: 'string',
        required: true,
        choices: { youtube: 'YouTube', tiktok: 'TikTok', instagram: 'Instagram', reddit: 'Reddit', linkedin: 'LinkedIn' },
        default: 'youtube',
      },
      {
        key: 'handle',
        label: 'Handle or ID',
        type: 'string',
        required: true,
        helpText: 'YouTube: channel ID/handle · TikTok: username · Instagram: username · Reddit: username (returns recent posts) · LinkedIn: company ID/slug.',
      },
      { key: 'limit', label: 'Max items', type: 'integer', helpText: 'Reddit only.' },
    ],
    perform,
    sample: { handle: 'example', name: 'Example', followers: 12000, url: 'https://example.com/@example' },
  },
};
