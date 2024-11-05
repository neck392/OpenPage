const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Visit the page and wait for it to load
  await page.goto('https://neck392.tistory.com/64', { waitUntil: 'networkidle2' });

  // Extract and print the page title
  const pageTitle = await page.title();
  console.log('Page Title:', pageTitle);

  // Print the entire HTML of the page for analysis
  const pageContent = await page.content();
  console.log('Page HTML:', pageContent);

  // Wait for a specific element to appear in the DOM
  try {
    await page.waitForFunction(() => {
      return document.querySelector('article, .post-content, .entry-content');
    }, { timeout: 15000 }); // Extended timeout for dynamic loading

    // Extract the main content using the identified selector
    const content = await page.evaluate(() => {
      const mainContent = document.querySelector('article, .post-content, .entry-content')?.innerText.trim();
      return mainContent;
    });

    if (content) {
      console.log('Main Content:', content);
    } else {
      console.log('Main content not found. Please check the selector.');
    }
  } catch (error) {
    console.error('Error: Main content not found or timeout exceeded.', error);
  }

  // Close the browser
  await browser.close();
})();
