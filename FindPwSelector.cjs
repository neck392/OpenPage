const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 페이지로 이동
  await page.goto('page url', { waitUntil: 'networkidle2' });

  // 패스워드 관련 셀렉터 탐색
  const passwordSelector = await page.evaluate(() => {
    // input 요소 중 "password" 키워드를 포함한 요소 찾기
    const passwordInput = Array.from(document.querySelectorAll('input')).find(input => {
      const typeAttr = input.getAttribute('type') || '';
      const nameAttr = input.getAttribute('name') || '';
      const idAttr = input.getAttribute('id') || '';

      // "password" 키워드를 포함하는 요소 찾기
      return typeAttr.includes('password') || nameAttr.includes('password') || idAttr.includes('password');
    });

    // 요소가 있다면 name 속성 반환
    return passwordInput ? passwordInput.getAttribute('name') : null;
  });

  if (passwordSelector) {
    console.log('Password-related selector found:', passwordSelector);

    // 탐색한 셀렉터로 비밀번호 입력
    await page.type(`[name="${passwordSelector}"]`, 'sample_password');
  } else {
    console.log('No password-related input found.');
  }

  await browser.close();
})();
