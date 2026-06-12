'use strict';

const { apiGet, clean } = require('../util');

const perform = (z, bundle) =>
  apiGet(z, '/geocoding/search', clean({
    q: bundle.inputData.q,
    country: bundle.inputData.country,
    limit: bundle.inputData.limit,
    addressdetails: 1,
  }));

module.exports = {
  key: 'geocode_address',
  noun: 'Location',
  display: {
    label: 'Geocode an Address',
    description: 'Convert a free-form address or place name into coordinates and structured location data.',
  },
  operation: {
    inputFields: [
      { key: 'q', label: 'Address or place', type: 'string', required: true, helpText: 'e.g. "1600 Amphitheatre Parkway, Mountain View".' },
      { key: 'country', label: 'Country code', type: 'string', helpText: 'Optional ISO code to bias results, e.g. `us`.' },
      { key: 'limit', label: 'Max results', type: 'integer', default: '5' },
    ],
    perform,
    sample: { results: [{ lat: '37.4220', lon: '-122.0841', display_name: '1600 Amphitheatre Parkway, Mountain View, CA, USA' }] },
  },
};
