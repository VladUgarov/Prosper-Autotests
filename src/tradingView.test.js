const {Builder, By, Key, until} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let {connectMetamask, connectMetamaskToProsper, sleep} = require('../functionHelps')
let driver;
let options;

describe('TradingView', function (){
  beforeEach(async function (){
    options = new chrome.Options;
    options.addArguments("--lang=en");
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.manage().window().maximize();
    await driver.get('https://platform.prosper.so/');
    sleep(1000)
    await driver.wait(until.elementLocated(By.id('openLanguageMenu')),15000)
  },10000)

  afterEach(async function (){
    await driver.quit()
  },10000)

  test('openTradingView', async function (){
    let coin =  await driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[2]/div[1]/div/div[2]/div/div")).getText()
    let statusBlock = await driver.findElement(By.xpath("//div[text()='Open block']")).getText();
    await driver.findElement(By.xpath("//div[text()='Open block']")).click();
    sleep(2000)
    let iframe = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[6]/div[2]/div/div/div/div/div/div[1]/div/div/iframe"))
    await driver.switchTo().frame(iframe)
    sleep(2000)
    let coinTV = await driver.findElement(By.xpath("//*[@id='widget-container']/div[2]/div/div/div[1]/div/table/tr[1]/td[2]/div/div[2]/div[1]/div/div[1]/div[1]/div[1]")).getText()
    if (coin === 'AXS'){
      await expect(coinTV).toEqual('AXS / TetherUS')
    }
    await driver.switchTo().defaultContent();
    await driver.findElement(By.xpath("//div[text()='Hide block']")).click();
    await expect(statusBlock).toEqual('OPEN BLOCK')
  },15000)
})
