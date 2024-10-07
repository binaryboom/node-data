const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set User-Agent to mimic a browser
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  await page.goto('https://www.coke2home.com/thunderwheels', {
    waitUntil: 'networkidle2', // Wait until the page fully loads
  });

  // Extract the "REWARDS WON SO FAR" value from the HTML
//   const rewardsValue = await page.evaluate(() => {
//     const element = document.querySelector('.voucher-counts .group.flex .data .text');
//     return element ? element.innerText : null;
//   });

//   console.log('Rewards won so far:', rewardsValue);
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

  await browser.close();
})();
