const {Builder, By, Key, until} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let {connectMetamask, sleep} = require('./connectMetamask')
let driver;
let options;

describe('HeaderNavigateMenu', function (){
  beforeEach(async function (){
    options = new chrome.Options;
    options.addArguments("--lang=en");
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.manage().window().maximize();
    await driver.get('https://platform.prosper.so/');
    await driver.wait(until.elementLocated(By.id('openLanguageMenu')),15000)
  },10000)

  afterEach(async function (){
    await driver.quit()
  },10000)

  test('goToSocialPredict', async function (){
    await driver.findElement(By.xpath("//a[text()='Social predictions']")).click();
    let tables = await driver.getAllWindowHandles();
    await driver.switchTo().window(tables[1]);
    await driver.wait(until.elementLocated(By.xpath("//div[text()='Welcome to market of social prediction']")),15000);
    let h2 =  await driver.findElement(By.xpath("//div[text()='Welcome to market of social prediction']")).getText()
    await expect(h2).toEqual('Welcome to market of social prediction')
  },10000)

  test('goToMining', async function (){
    await driver.findElement(By.xpath("//a[text()='Mining']")).click();
    await driver.wait(until.elementLocated(By.xpath("//h2[text()='Prediction mining']")),15000);
    let h2 =  await driver.findElement(By.xpath("//h2[text()='Prediction mining']")).getText()
    await expect(h2).toEqual('Prediction mining')
  })

  test('goToLeaderboard', async function (){
    await driver.findElement(By.xpath("//a[text()='Leaderboard']")).click();
    await driver.wait(until.elementLocated(By.xpath("//h2[text()='Leaderboard']")),15000);
    let h2 =  await driver.findElement(By.xpath("//h2[text()='Leaderboard']")).getText()
    await expect(h2).toEqual('Leaderboard')
  },10000)

  test('goToReferral', async function (){
    await driver.findElement(By.xpath("//a[text()='Referral']")).click();
    await driver.wait(until.elementLocated(By.xpath("//h2[text()='Prosper Referral Program']")),15000);
    let h2 =  await driver.findElement(By.xpath("//h2[text()='Prosper Referral Program']")).getText()
    await expect(h2).toEqual('Prosper Referral Program')
  },10000)

  test('goToInformation', async function (){
    await driver.findElement(By.xpath("//a[text()='Information']")).click();
    let tables = await driver.getAllWindowHandles();
    await driver.switchTo().window(tables[1]);
    await driver.wait(until.elementLocated(By.xpath("//strong[text()='Rules']")),15000);
    let h2 =  await driver.findElement(By.xpath("//strong[text()='Rules']")).getText()
    await expect(h2).toEqual('Rules')
  },10000)

  test('goToPools', async function (){
    await driver.findElement(By.xpath("//a[text()='Leaderboard']")).click();
    await driver.wait(until.elementLocated(By.xpath("//h2[text()='Leaderboard']")),15000)
    await driver.findElement(By.xpath("//a[text()='Pools']")).click();
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/div/div[1]/h2')),15000)
    let h2 =  await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[1]/h2')).getText()
    await expect(h2).toEqual('Who are you today?')
  },10000)

  test('checkLogo', async function (){
    await driver.findElement(By.xpath("//a[text()='Leaderboard']")).click();
    await driver.wait(until.elementLocated(By.xpath("//h2[text()='Leaderboard']")),15000)
    await driver.findElement(By.xpath("//*[@id='root']/div/div[1]/div/div/div[1]")).click();
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/div/div[1]/h2')),15000)
    let h2 =  await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[1]/h2')).getText()
    await expect(h2).toEqual('Who are you today?')
  },10000)
})

describe('HeaderConnectMetamask', function (){
  beforeEach(async function (){
    driver = await connectMetamask()
  },25000)

  afterEach(async function (){
    await driver.quit()
  },10000)

  test('Connect metamask to prosper', async function () {
    let result = await driver.findElement(By.xpath("//*[@id=\"app-content\"]/div/div[3]/div/div/div/div[3]/div/div[3]/div[1]/h6")).getText()
    await expect(result).toEqual("Don't see your token?");
    let tables = await driver.getAllWindowHandles();
    await driver.switchTo().window(tables[1]);
    sleep(2000)
    tables = await driver.getAllWindowHandles();
    await driver.switchTo().window(tables[2]);
    await driver.wait(until.elementLocated(By.xpath("//button[text()='Next']")), 15000);
    await driver.findElement(By.xpath("//button[text()='Next']")).click();
    await driver.wait(until.elementLocated(By.xpath("//button[text()='Connect']")), 15000);
    await driver.findElement(By.xpath("//button[text()='Connect']")).click();
    await driver.switchTo().window(tables[1]);
    sleep(3000)
    await driver.wait(until.elementLocated(By.xpath("//div[text()='Statistics']")), 15000);
    let result2 = await driver.findElement(By.xpath("//div[text()='Statistics']")).getText()
    await expect(result2).toEqual("Statistics");
  },50000)
})

describe('HeaderChangeLanguage', function (){
  beforeEach(async function (){
    options = new chrome.Options;
    options.addArguments("--lang=en");
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.get('https://platform.prosper.so/');
    await driver.wait(until.elementLocated(By.id('openLanguageMenu')),15000)
  },10000)

  afterEach(async function (){
    await driver.quit()
  },10000)

  test('ENG-RU', async function (){
    await driver.findElement(By.id('openLanguageMenu')).click();
    await driver.wait(until.elementLocated(By.xpath("//*[@id='menu-']/div[3]/ul/li[15]")),15000)
    await driver.findElement(By.xpath("//*[@id='menu-']/div[3]/ul/li[15]")).click();
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/div/div[1]/h2')),15000)
    let h2 =  await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[1]/h2')).getText()
    await expect(h2).toEqual('Кто ты сегодня?')
  },10000)
})
