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

  // Wait for the main content to appear (use a valid selector based on the page's structure)
  try {
    await page.waitForSelector('article', { timeout: 5000 }); // Adjust the selector as needed

    // Extract the content
    const content = await page.evaluate(() => {
      const mainContent = document.querySelector('article')?.innerText.trim(); // Adjust selector
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
