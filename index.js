const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

(async () => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless, // Use true for headless mode
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    await page.goto('https://www.coke2home.com/thunderwheels', {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    const rewardsValue = await page.evaluate(() => {
      const labels = ['bike', 'fancode', 'fk gc'];
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
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
