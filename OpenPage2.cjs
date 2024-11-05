const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('page url', { waitUntil: 'networkidle2' });

  // Extract the page title
  const pageTitle = await page.title();
  console.log('Page Title:', pageTitle);

  // Wait for the page to render dynamic content
  await page.waitForFunction(() => document.querySelector('article, .post-content, .entry-content'));

  const content = await page.evaluate(() => {
    const mainContent = document.querySelector('article, .post-content, .entry-content')?.innerText.trim();
    return mainContent;
  });

  if (content) {
    console.log('Main Content:', content);
  } else {
    console.log('Main content not found. Please check the selector.');
  }

  await browser.close();
})();
