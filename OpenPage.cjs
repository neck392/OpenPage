const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://neck392.tistory.com/64')
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Extracting page title
    const pageTitle = $('title').text();
    console.log('Page Title:', pageTitle);

    // Extracting main content with the correct selector
    const mainContent = $('.post-content').text().trim(); // Adjust the selector as needed
    if (mainContent) {
      console.log('Main Content:', mainContent);
    } else {
      console.log('Main content not found. Please check the selector.');
    }
  })
  .catch(error => {
    console.error('Error occurred during page request:', error);
  });
