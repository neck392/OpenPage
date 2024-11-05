const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser with a visible window
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to the page and wait for it to load
  await page.goto('https://neck392.tistory.com/64', { waitUntil: 'networkidle2' });

  // Enter the password and submit the form
  await page.type('input[name="entry64password"]', 'password'); // Replace 'yourPassword' with the actual password
  await page.click('button[type="submit"]');

  // Wait for the page to reload after form submission
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Extract the main content from the page
  try {
    const content = await page.evaluate(() => {
      const mainContent = document.querySelector('article, .postContent, .entryContent')?.innerText.trim(); // Adjust the selector if necessary
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
