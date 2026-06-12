'use strict';

const { version: platformVersion } = require('zapier-platform-core');

const { version } = require('./package.json');
const authentication = require('./authentication');
const { addApiKeyHeader, handleError } = require('./middleware');

const getPageContent = require('./creates/get-page-content');
const webSearch = require('./creates/web-search');
const findContacts = require('./creates/find-contacts');

const App = {
  version,
  platformVersion,

  authentication,

  beforeRequest: [addApiKeyHeader],
  afterResponse: [handleError],

  triggers: {},
  searches: {},
  creates: {
    [getPageContent.key]: getPageContent,
    [webSearch.key]: webSearch,
    [findContacts.key]: findContacts,
  },
};

module.exports = App;
