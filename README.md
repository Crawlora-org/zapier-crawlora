# Crawlora for Zapier

Get structured web data and clean page content from the public web inside your Zaps.

[Crawlora](https://crawlora.net) is a structured web-data API. This integration brings a focused set
of generic actions to Zapier so you can fetch page content, run web searches, and find public
website contacts — then send the results to Sheets, Slack, a database, an AI step, or anywhere else.

## Actions

| Action | What it does |
| --- | --- |
| **Get Page Content** | Fetch any URL as Markdown, HTML, links, or page metadata. |
| **Web Search** | Run a web search (Bing or Brave) and get ranked results as structured data. |
| **Find Website Contacts** | Find public emails, phones, and social profiles for a website by its URL. |
| **Get Search Suggestions** | Get autocomplete suggestions for a search term. |
| **Geocode an Address** | Convert an address or place name into coordinates and structured location data. |
| **Reverse Geocode Coordinates** | Convert latitude/longitude into a structured address. |
| **Check Site Accessibility** | Check whether a public page is reachable and what bot-protection signals it presents. |
| **Find Local Businesses** | Find local businesses for a query (live map search or the stored business dataset). |
| **Get Product Details** | Get product/app details by identifier from a chosen source. |
| **Search a Marketplace** | Search a marketplace for products matching a query. |
| **Get Reviews** | Get public reviews for a business, app, or listing from a chosen source. |
| **Get Financial Quote** | Get the latest stock, index, or crypto quote from a chosen source. |
| **Get Social Profile** | Get a public profile (or recent posts) by handle from a chosen platform. |

Each action picks its data source with a dropdown — there are no per-site actions — and every request
uses your Crawlora API key.

## Authentication

Crawlora uses API-key authentication. Paste your key when you connect the app; it is sent as the
`x-api-key` header on every request. Get a key from your
[Crawlora dashboard](https://crawlora.net/app/api-keys) — new accounts include a free monthly credit
allowance, no card required.

## Local development

This integration is built with the [Zapier Platform CLI](https://docs.zapier.com/platform/cli).

```bash
npm install
npm run validate          # local structural + integration checks (no Zapier login needed)
npm test                  # unit tests; set CRAWLORA_API_KEY to also run live tests

# Publish from your Zapier account (the CLI binary is `zapier-platform` in v19+;
# older versions expose it as `zapier`):
npx zapier-platform login
npx zapier-platform register "Crawlora"   # first time only
npx zapier-platform push                  # upload this version to your Zapier integration
```

Copy `.env.example` to `.env` and set `CRAWLORA_API_KEY` to run the live tests.

## Links

- API documentation: https://docs.crawlora.net
- Crawlora: https://crawlora.net

## License

MIT — see [LICENSE](./LICENSE).
