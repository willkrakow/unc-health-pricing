# UNC Health Procedure Prices
... because scraping the data and building this app was easier than trying to find the answers on unchealthcare.org

## Getting the data
I discovered that the API that UNC uses on their own website is unauthenticated, so I wrote a Python script that made 1 call per second to the API and pulled down the price data for more than 3000 procedures across every payer (i.e., insurance company) they work with.

Initially the script cycled through a list of 10 http proxies to avoid getting blacklisted by the server, but I decided – just for kicks – to try it without the proxies to see what would happen. In short: nothing happened. I was able to send the same request +1 to the server for about 3 hours.

If anyone would like to help, I still need to clean the data from a bunch of CSV files before adding them to the database. Those files are a mess. Prices are formatted in every which way (e.g., $4125, 4125.00, 4125, $4,125, 4,125.00, 4,125) and some of the procedure names contain obtuse abbreviations.
