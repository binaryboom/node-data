const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Ensure headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Add any necessary args for the environment
  });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  try {
    await page.goto('https://www.coke2home.com/thunderwheels', {
      waitUntil: 'networkidle2',
      timeout: 60000, // Increase timeout
    });

    const rewardsValue = await page.evaluate(() => {
      const labels = ['bike', 'fancode', 'fk gc']; // Add more labels as necessary
      const elements = document.querySelectorAll('.voucher-counts .group.flex .data .text');
      const rewards = {};
  
      elements.forEach((el, index) => {
        rewards[labels[index]] = el ? el.innerText : null;
      });
  
      return rewards;
    });
  
    console.log('Rewards won so far:', rewardsValue);
  } catch (error) {
    console.error('Error occurred:', error);
  }

  await browser.close();
})();
