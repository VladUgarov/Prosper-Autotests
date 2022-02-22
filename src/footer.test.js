const {Builder, By, Key, until} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let {connectMetamask, connectMetamaskToProsper, sleep, visible} = require('../functionHelps')
let driver;
let options;

describe('FooterNavigateMenu', function (){
  beforeEach(async function (){
    options = new chrome.Options;
    options.addArguments("--lang=en");
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.manage().window().maximize();
    await driver.get('https://platform.prosper.so/');
    sleep(1000)
    await driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/footer/div[2]/div/span[1]")),15000)
  },10000)

  afterEach(async function (){
    await driver.quit()
  },10000)

  test('goToInformation', async function (){
    await driver.findElement(By.xpath("//*[@id='root']/div/footer/div[1]/div/a[2]")).click();
    let tables = await driver.getAllWindowHandles();
    await driver.switchTo().window(tables[1]);
    sleep(2000)
    await driver.wait(until.elementLocated(By.xpath("//strong[text()='Rules']")),15000);
    let h2 =  await driver.findElement(By.xpath("//strong[text()='Rules']")).getText()
    await expect(h2).toEqual('Rules')
  },10000)

  test('goToHowItWorks', async function (){
    await driver.findElement(By.xpath("//*[@id='root']/div/footer/div[1]/div/a[3]")).click();
    let tables = await driver.getAllWindowHandles();
    await driver.switchTo().window(tables[1]);
    sleep(2000)
    await driver.wait(until.elementLocated(By.xpath("//div[text()='How does it work']")),15000);
    let h2 =  await driver.findElement(By.xpath("//div[text()='How does it work']")).getText()
    await expect(h2).toEqual('How does it work')
  },10000)

  test('goToPrivacyPolicy', async function (){
    await driver.findElement(By.xpath("//a[text()='Privacy policy']")).click();
    let tables = await driver.getAllWindowHandles();
    await driver.switchTo().window(tables[1]);
    sleep(2000)
    await driver.wait(until.elementLocated(By.xpath("//strong[text()='Privacy Policy']")),15000);
    let h2 =  await driver.findElement(By.xpath("//strong[text()='Privacy Policy']")).getText()
    await expect(h2).toEqual('Privacy Policy')
  },10000)

  test('goToTermsOfService', async function (){
    await driver.findElement(By.xpath("//a[text()='Terms of use']")).click();
    let tables = await driver.getAllWindowHandles();
    await driver.switchTo().window(tables[1]);
    sleep(2000)
    await driver.wait(until.elementLocated(By.xpath("//strong[text()='Terms of Service']")),15000);
    let h2 =  await driver.findElement(By.xpath("//strong[text()='Terms of Service']")).getText()
    await expect(h2).toEqual('Terms of Service')
  },10000)

  test('goToCookies', async function (){
    await driver.findElement(By.xpath("//a[text()='Cookies']")).click();
    let tables = await driver.getAllWindowHandles();
    await driver.switchTo().window(tables[1]);
    sleep(2000)
    await driver.wait(until.elementLocated(By.xpath("//strong[text()='Cookies Notice']")),15000);
    let h2 =  await driver.findElement(By.xpath("//strong[text()='Cookies Notice']")).getText()
    await expect(h2).toEqual('Cookies Notice')
  },10000)

  test('TelegramLink', async function (){
    await driver.findElement(By.xpath("//*[@id='root']/div/footer/div[2]/div/span[1]")).click();
    let tables = await driver.getAllWindowHandles();
    await driver.switchTo().window(tables[1]);
    sleep(2000)
    let result =  await driver.getCurrentUrl()
    await expect(result).toEqual('https://t.me/prosperfi')
  },10000)

  test('TwitterLink', async function (){
    let result = await driver.findElement(By.xpath("//*[@id='root']/div/footer/div[2]/div/span[2]/a")).getAttribute("href");
    await expect(result).toEqual('https://twitter.com/Prosperpredict')
  },10000)

  test('MediumLink', async function (){
    await driver.findElement(By.xpath("//*[@id='root']/div/footer/div[2]/div/span[3]")).click();
    let tables = await driver.getAllWindowHandles();
    await driver.switchTo().window(tables[1]);
    sleep(2000)
    let result =  await driver.getCurrentUrl()
    await expect(result).toEqual('https://medium.com/prosper')
  },10000)

})
