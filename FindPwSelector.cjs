const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the target page
  await page.goto('page url', { waitUntil: 'networkidle2' });

  // Find the password-related selector
  const passwordSelector = await page.evaluate(() => {
    // Search for an input element containing the keyword "password"
    const passwordInput = Array.from(document.querySelectorAll('input')).find(input => {
      const typeAttr = input.getAttribute('type') || '';
      const nameAttr = input.getAttribute('name') || '';
      const idAttr = input.getAttribute('id') || '';

      // Look for an element that includes "password" in its attributes
      return typeAttr.includes('password') || nameAttr.includes('password') || idAttr.includes('password');
    });

    // If the element exists, return the selector
    if (passwordInput) {
      return {
        selector: passwordInput.getAttribute('name') 
          ? `input[name="${passwordInput.getAttribute('name')}"]`
          : passwordInput.getAttribute('id') 
            ? `input#${passwordInput.getAttribute('id')}`
            : null,
        name: passwordInput.getAttribute('name'),
        id: passwordInput.getAttribute('id'),
        type: passwordInput.getAttribute('type')
      };
    }
    return null;
  });

  if (passwordSelector && passwordSelector.selector) {
    console.log('Password-related selector found:', passwordSelector.selector);
    console.log('Additional Details:', passwordSelector);

    // Use the found selector to type the password
    await page.type(passwordSelector.selector, 'sample_password');
  } else {
    console.log('No password-related input found.');
  }

  await browser.close();
})();
