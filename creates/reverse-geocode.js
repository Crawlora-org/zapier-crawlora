'use strict';

const { apiGet, clean } = require('../util');

const perform = (z, bundle) =>
  apiGet(z, '/geocoding/reverse', clean({
    lat: bundle.inputData.lat,
    lon: bundle.inputData.lon,
    addressdetails: 1,
  }));

module.exports = {
  key: 'reverse_geocode',
  noun: 'Location',
  display: {
    label: 'Reverse Geocode Coordinates',
    description: 'Convert latitude/longitude coordinates into a structured address.',
  },
  operation: {
    inputFields: [
      { key: 'lat', label: 'Latitude', type: 'string', required: true },
      { key: 'lon', label: 'Longitude', type: 'string', required: true },
    ],
    perform,
    sample: { lat: '37.4220', lon: '-122.0841', display_name: 'Mountain View, CA, USA', address: { city: 'Mountain View', country: 'United States' } },
  },
};
