const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    args: ['--disable-blink-features=AutomationControlled']
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://play.google.com/console/u/0/developers/6788428109964381555/app/4974479300686687193/tracks/4697436565363320710/releases/4/prepare');
  await page.waitForTimeout(15000);
  const title = await page.title();
  console.log('Title:', title);
  await page.screenshot({ path: '/var/folders/2n/k0r8s3d96bb80wjfs9lcdp3w0000gn/T/opencode/brave-play-console.png' });
  // Keep browser open
  await new Promise(() => {});
})();
