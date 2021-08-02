const puppeteer = require('puppeteer');

function fetchLeaderboards(statName, limit, onData) {
    const url = `https://www.timolia.de/game/${statName.toLowerCase()}/leaderboard`;
    try{
        (async () => {
            const browser = await puppeteer.connect({browserWSEndpoint: 'wss://chrome.browserless.io/'});
            //const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            await page.waitForSelector('tbody > tr > td > a', {
                visible: true,
            });
            const content = await page.content();
            //saveStats(content, limit, (stats) => onData(stats));
            onData(content)
            await browser.close();
        })();
      } catch(error){
        console.error('Error in async', error)
      }
}

fetchLeaderboards('4rena', 100, (data) => {
    console.log(data)
})