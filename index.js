const puppeteer = require("puppeteer-core");
const id = ""; //Enter the id of the user
const pw = ""; //Enter the password
let songs =[]; //Enter the name of songs you want to add in the playlist 
(async function () {
    let browser = await puppeteer.launch({
      ignoreDefaultArgs: ['--disable-extensions'],
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
      slowMo:5,
    });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://accounts.spotify.com/en/login?continue=https:%2F%2Fopen.spotify.com%2F");
    await tab.click("#login-username");
    await tab.type("#login-username", id);
    await tab.click("#login-password");
    await tab.type("#login-password", pw);
    await tab.click("#login-remember");
    await tab.click("#login-button");
    await tab.waitForSelector("button[class='onetrust-close-btn-handler onetrust-close-btn-ui banner-close-button ot-close-icon']",{visible : true});
    await tab.click("button[class='onetrust-close-btn-handler onetrust-close-btn-ui banner-close-button ot-close-icon']");
    await Promise.all([
        await tab.waitForSelector("button[data-testid='create-playlist-button']",{ visible: true }),
        await tab.waitForTimeout(3000),
        await tab.click("button[data-testid='create-playlist-button']"),
      ]);
      for(let i in songs){
        await tab.waitForSelector("input[role='searchbox']",{ visible: true });
        await tab.type("input[role='searchbox']",songs[i]);
        await tab.waitForSelector("button[data-testid='add-to-playlist-button']",{ visible: true });
        await tab.waitForTimeout(1000);
        await tab.click("button[data-testid='add-to-playlist-button']");
        await tab.waitForTimeout(1000);
        await tab.click("button[aria-label='Clear search field']");
      }
    await tab.waitForTimeout(3000);
    await tab.click("button[data-testid='play-button']");
    for(let i=0;i<songs.length;i++){
      await tab.waitForTimeout(30000);
      await tab.click("button[data-testid='control-button-skip-forward']");
    }
    await tab.waitForTimeout(2500);
    browser.close();
})();
