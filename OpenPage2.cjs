const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Visit the page
  await page.goto('https://neck392.tistory.com/64', { waitUntil: 'networkidle2' });

  // Extract the page title
  const pageTitle = await page.title();
  console.log('Page Title:', pageTitle);

  // Wait to ensure the page content is fully loaded
  await new Promise(resolve => setTimeout(resolve, 5000)); // Custom wait time function

  // Try a more common selector or inspect the page's HTML structure
  try {
    await page.waitForSelector('article, .post-content, .entry-content', { timeout: 10000 }); // Extended timeout and multiple selectors

    // Extract the content
    const content = await page.evaluate(() => {
      const mainContent = document.querySelector('article, .post-content, .entry-content')?.innerText.trim(); // Adjust selector
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
