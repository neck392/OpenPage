const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://neck392.tistory.com/64')
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // 페이지 제목 추출
    const title = $('title').text();
    console.log('페이지 제목:', title);

    // 메인 콘텐츠 추출: 올바른 선택자를 사용해야 함
    const mainContent = $('.post-content').text().trim(); // 예: 'article', '.post-content', 등으로 수정
    if (mainContent) {
      console.log('메인 콘텐츠:', mainContent);
    } else {
      console.log('메인 콘텐츠를 찾을 수 없습니다. 선택자를 확인하세요.');
    }
  })
  .catch(error => {
    console.error('페이지 요청 중 오류 발생:', error);
  });
