'use strict';

const zapier = require('zapier-platform-core');

const App = require('../index');

const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const API_KEY = process.env.CRAWLORA_API_KEY;
const liveIt = API_KEY ? it : it.skip;

// Schema validation runs via `npm run validate` (the Zapier CLI compiles function
// references before validating). These tests cover structure + publishing-policy rules.
describe('Crawlora app definition', () => {
  it('exposes the expected generic actions', () => {
    expect(Object.keys(App.creates).sort()).toEqual(
      ['find_website_contacts', 'get_page_content', 'web_search'].sort()
    );
  });

  it('every action has a label, description, perform, and sample', () => {
    Object.values(App.creates).forEach((action) => {
      expect(action.display.label).toBeTruthy();
      expect(action.display.description).toBeTruthy();
      expect(typeof action.operation.perform).toBe('function');
      expect(action.operation.sample).toBeTruthy();
    });
  });

  it('no action name references a specific third-party site (publishing rule)', () => {
    const banned = /(youtube|google|bing|brave|amazon|tiktok|instagram|scrap)/i;
    Object.values(App.creates).forEach((action) => {
      expect(action.display.label).not.toMatch(banned);
      expect(action.key).not.toMatch(banned);
    });
  });
});

// Live tests run only when CRAWLORA_API_KEY is set (CI / local with a real key).
describe('Crawlora app (live)', () => {
  const bundle = { authData: { api_key: API_KEY } };

  liveIt('authenticates with a valid key', async () => {
    const response = await appTester(App.authentication.test, bundle);
    expect(response.status).toBe(200);
  });

  liveIt('gets page content as markdown', async () => {
    const result = await appTester(App.creates.get_page_content.operation.perform, {
      ...bundle,
      inputData: { url: 'https://example.com', formats: ['markdown'] },
    });
    expect(result.markdown).toContain('Example Domain');
  });

  liveIt('runs a web search', async () => {
    const result = await appTester(App.creates.web_search.operation.perform, {
      ...bundle,
      inputData: { q: 'openai', engine: 'bing' },
    });
    expect(Array.isArray(result.results)).toBe(true);
  });
});
