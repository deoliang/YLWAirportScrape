const puppeteer = require('puppeteer');
const url = 'https://ylw.kelowna.ca/passengers/departures';
const $ = require('cheerio');
const fs = require('fs');
const YLWDestinations = {
    "Cities": []
}

const uniqueSet = new Set();
puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto(url);
    let html = await page.content();
    await $('.flight-from',html).each(function(i, elem) {
        if(uniqueSet.has($(this).text()))return true;
         uniqueSet.add($(this).text())   
     });
 
    YLWDestinations.Cities = await [...uniqueSet].sort();
            
    await fs.writeFile('YLWDestinations.json', JSON.stringify(YLWDestinations), function(err){
        if (err) throw err;
        console.log("Successfully Written to File.");
    });
    await browser.close();
  });