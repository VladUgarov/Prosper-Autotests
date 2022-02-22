const {Builder, By, Key, until} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');

let driver
const SECRET_RECOVERY_PHRASE = 'appear private heart walnut scan task cattle scene biology govern wear recipe'
let options = new chrome.Options;
options.addArguments("--lang=en");
options.addExtensions('metamask.crx');

async function connectMetamask() {
  driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  await driver.manage().window().maximize();
  await driver.get('https://platform.prosper.so/');
  sleep(1000)
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

async function connectMetamaskToProsper() {
  driver = await connectMetamask()
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
  return driver
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// function visible(y,x) {
//   let targetPosition = {
//     y: y,
//     x: x
//   }
//   let windowPosition = {
//     y: window.pageYOffset,
//     x: window.pageXOffset,
//   };
//
//   if (targetPosition.bottom > windowPosition.y && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
//     targetPosition.y < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
//     targetPosition.right > windowPosition.x && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
//     targetPosition.x < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
//     // Если элемент полностью видно, то запускаем следующий код
//     return true
//   } else {
//     return false
//   };
//
// }

module.exports = {connectMetamask, connectMetamaskToProsper, sleep}
