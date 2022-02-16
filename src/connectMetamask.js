const {Builder, By, Key, until} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');

let driver
const SECRET_RECOVERY_PHRASE = 'appear private heart walnut scan task cattle scene biology govern wear recipe'
let options = new chrome.Options;
options.addArguments("--lang=en");
options.addExtensions('metamask.crx');

async function connectMetamask(){
  driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  await driver.get('https://platform.prosper.so/');
  let tables = await driver.getAllWindowHandles();
  await driver.switchTo().window(tables[0]);
  await driver.wait(until.elementLocated(By.xpath('//button[text()="Get Started"]')), 15000);
  await driver.findElement(By.xpath('//button[text()="Get Started"]')).click();
  await driver.wait(until.elementLocated(By.xpath('//button[text()="Import wallet"]')), 15000);
  await driver.findElement(By.xpath('//button[text()="Import wallet"]')).click();
  await driver.wait(until.elementLocated(By.xpath('//button[text()="No Thanks"]')), 15000);
  await driver.findElement(By.xpath('//button[text()="No Thanks"]')).click();
  await driver.wait(until.elementLocated(By.xpath('//*[@id="app-content"]/div/div[2]/div/div/form/div[4]/div[1]/div/input')), 15000);
  await driver.findElement(By.xpath('//*[@id="app-content"]/div/div[2]/div/div/form/div[4]/div[1]/div/input')).sendKeys(SECRET_RECOVERY_PHRASE);
  await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('12345678');
  await driver.findElement(By.xpath('//*[@id="confirm-password"]')).sendKeys('12345678');
  await driver.findElement(By.xpath('//*[@id="app-content"]/div/div[2]/div/div/form/div[7]/div')).click();
  await driver.findElement(By.xpath('//*[@id="app-content"]/div/div[2]/div/div/form/button')).click();
  await driver.wait(until.elementLocated(By.xpath('//*[@id="app-content"]/div/div[2]/div/div/button')), 15000);
  await driver.findElement(By.xpath('//*[@id="app-content"]/div/div[2]/div/div/button')).click();
  await driver.wait(until.elementLocated(By.xpath('//*[@id="app-content"]/div/div[2]/div/div[2]/div[2]/button[2]')), 15000);
  await driver.findElement(By.xpath('//*[@id="app-content"]/div/div[2]/div/div[2]/div[2]/button[2]')).click();
  await driver.wait(until.elementLocated(By.xpath('//*[@id="app-content"]/div/div[2]/div/div[2]/div[2]/button[2]')), 15000);
  await driver.findElement(By.xpath('//*[@id="app-content"]/div/div[2]/div/div[2]/div[2]/button[2]')).click();
  return driver
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

module.exports = {connectMetamask, sleep}
