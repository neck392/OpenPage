const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // input page url
  await page.goto('page url', { waitUntil: 'networkidle2' });

  // Extract the page title
  const pageTitle = await page.title();
  console.log('Page Title:', pageTitle);

  // Print the entire HTML of the page to analyze
  const pageContent = await page.content();
  console.log('Page HTML:', pageContent);

  await browser.close();
})();
