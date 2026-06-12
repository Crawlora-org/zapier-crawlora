# Zap templates

Ready-to-build Zap templates that pair Crawlora actions with common apps. Build each one in the
Zapier editor, turn it on, then publish it from **Integration Home → Zap templates**. Titles lead
with the use case; descriptions avoid naming scraped sites and never use the word "scraping".

1. **Save web page content from new Google Sheets URLs**
   Google Sheets (New or Updated Spreadsheet Row) → **Get Page Content** → Google Sheets (Update Row).
   *When a URL is added to your sheet, fetch the page as Markdown and write it back to the row.*

2. **Post daily web search results to Slack**
   Schedule by Zapier (Every Day) → **Web Search** → Slack (Send Channel Message).
   *Run a saved query each morning and post the top results to a Slack channel.*

3. **Enrich new leads with website contacts in Airtable**
   Airtable (New Record) → **Find Website Contacts** → Airtable (Update Record).
   *For each new lead with a website, find public emails, phones, and social profiles.*

4. **Geocode addresses submitted through a form**
   Google Forms (New Form Response) → **Geocode an Address** → Google Sheets (Create Spreadsheet Row).
   *Turn each submitted address into latitude/longitude and a structured location.*

5. **Track a stock or crypto price in Google Sheets**
   Schedule by Zapier (Every Hour) → **Get Financial Quote** → Google Sheets (Create Spreadsheet Row).
   *Log the latest quote for a ticker or coin on a schedule.*

6. **Alert Slack when a site becomes unreachable**
   Schedule by Zapier (Every Hour) → **Check Site Accessibility** → Filter by Zapier → Slack.
   *Check a page on a schedule and alert your team if it stops responding.*

7. **Enrich Airtable products with details**
   Airtable (New Record) → **Get Product Details** → Airtable (Update Record).
   *For each product identifier, pull normalized details and write them back.*

8. **Send new business reviews to Slack**
   Schedule by Zapier (Every Day) → **Get Reviews** → Slack (Send Channel Message).
   *Surface fresh public reviews for a business or app in a channel.*

9. **Collect local-business leads into a Google Sheet**
   Schedule by Zapier (Every Day) → **Find Local Businesses** → Google Sheets (Create Spreadsheet Rows).
   *Run a local search and append the results as leads.*

10. **Enrich a Google Sheet with social profile data**
    Google Sheets (New Spreadsheet Row) → **Get Social Profile** → Google Sheets (Update Row).
    *Turn a handle in your sheet into public profile data.*

11. **Get search suggestions for new keywords**
    Google Sheets (New Spreadsheet Row) → **Get Search Suggestions** → Google Sheets (Update Row).
    *Expand a seed keyword into autocomplete suggestions.*

12. **Add a marketplace search to your workflow**
    Schedule by Zapier → **Search a Marketplace** → Google Sheets (Create Spreadsheet Rows).
    *Track products matching a query on a schedule.*
