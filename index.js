'use strict';

const { version: platformVersion } = require('zapier-platform-core');

const { version } = require('./package.json');
const authentication = require('./authentication');
const { addApiKeyHeader, handleError } = require('./middleware');

const getPageContent = require('./creates/get-page-content');
const webSearch = require('./creates/web-search');
const findContacts = require('./creates/find-contacts');
const getSearchSuggestions = require('./creates/get-search-suggestions');
const geocodeAddress = require('./creates/geocode-address');
const reverseGeocode = require('./creates/reverse-geocode');
const checkSiteAccessibility = require('./creates/check-site-accessibility');
const findLocalBusinesses = require('./creates/find-local-businesses');
const getProductDetails = require('./creates/get-product-details');
const searchMarketplace = require('./creates/search-marketplace');
const getReviews = require('./creates/get-reviews');
const getFinancialQuote = require('./creates/get-financial-quote');
const getSocialProfile = require('./creates/get-social-profile');

const register = (...actions) =>
  actions.reduce((acc, a) => ({ ...acc, [a.key]: a }), {});

const App = {
  version,
  platformVersion,

  authentication,

  beforeRequest: [addApiKeyHeader],
  afterResponse: [handleError],

  triggers: {},
  searches: {},
  creates: register(
    getPageContent,
    webSearch,
    findContacts,
    getSearchSuggestions,
    geocodeAddress,
    reverseGeocode,
    checkSiteAccessibility,
    findLocalBusinesses,
    getProductDetails,
    searchMarketplace,
    getReviews,
    getFinancialQuote,
    getSocialProfile
  ),
};

module.exports = App;
