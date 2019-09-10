const fs = require('fs');
const puppeteer = require('puppeteer');

run().then(() => console.log('Done')).catch(error => console.log(error));

async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });
    // await page.emulate(puppeteer.devices['iPad landscape']);

    await page.goto('https://google.com');

    // Type "JavaScript" into the search bar
    await page.evaluate(() => {
        document.querySelector('input[name="q"]').value = 'JavaScript';
    });

    // Click on the "Google Search" button and wait for the page to load
    const waitForLoad = new Promise(resolve => page.on('load', () => resolve()));
    await page.evaluate(() => {
        document.querySelector('input[value="Google Search"]').click();
    });
    await waitForLoad;

    // const buf = await page.screenshot();
    // fs.writeFileSync('./screenshot.png', buf);

    const elementHandle = await page.$('a cite');
    const firstResult = await page.evaluate(function getUrls(el) {
        return el.innerHTML;
    }, elementHandle);
    console.log(firstResult);
    await elementHandle.dispose();
    // Get all the search result URLs
    const links = await page.evaluate(function getUrls() {
        return Array.from(document.querySelectorAll('div.r').values()).
            map(el => {
                return el.firstChild.href;
            }); 
    });
    console.log(links);
    console.log(links.length);

    // await page.hover(e);

    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
}