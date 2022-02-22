const {Builder, By, Key, until} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let {connectMetamask, connectMetamaskToProsper, sleep, visible} = require('../functionHelps')
let driver;
let options;

describe('Predict', function () {
  beforeEach(async function (){
    driver = await connectMetamaskToProsper()
  },50000)

  afterEach(async function (){
    await driver.quit()
  },10000)

  test('PredictInBNBonAXS', async function (){
    let predictInMain = await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[2]/div[1]/div/div[1]/div/div")).getText()
    let conditionalPriceMain = await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div[1]/div[2]")).getText()
    conditionalPriceMain = conditionalPriceMain.slice(2,9)
    let timeframeMain = await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div[3]/div[2]")).getText()
    let predictOnPairMain = await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[2]/div[1]/div/div[2]/div/div")).getText()

    sleep(7000)
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[4]/div[2]/span")).click()
    await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[1]/div[2]/div[3]/div/div[2]/div/div/input")).sendKeys('.0001') // enter bnb pos
    sleep(1000)
    await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[1]/div[3]/div[1]")).click() // chose Bull

    let pair = driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[1]/div[1]/div[1]/div/div[2]")).getText()
    let resPair = driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[2]/div[1]/div/div[1]/div[2]")).getText()
    let myPos = await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[1]/div[2]/div[3]/div/div[2]/div/div/input")).getAttribute("value")
    let myPosRes = await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[2]/div[1]/div/div[5]/div[2]")).getText()
    let predictInMyPos = await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[1]/div[2]/div[1]/div/div[2]")).getText()
    let conditionalPriceMyPos = await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[1]/div[2]/div[2]/div/div[2]")).getText()
    let conditionalPriceRes = await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[2]/div[1]/div/div[2]/div[2]")).getText()
    conditionalPriceRes = conditionalPriceRes.slice(0,7)
    let predictOnPairMyPos = await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[1]/div[1]/div[1]/div/div[2]")).getText()
    predictOnPairMyPos = predictOnPairMyPos.substr(0,3)
    conditionalPriceMyPos = conditionalPriceMyPos.slice(2,9)
    myPosRes = myPosRes.slice(0,-4)
    let participantVolume = await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[1]/div[3]/div[1]/div/div[1]/div[2]/div")).getText()
    let timeframeMyPos = await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[1]/div[1]/div[2]/div/div[2]")).getText()
    let timeframeRes = await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[2]/div[1]/div/div[4]/div[2]")).getText()
    let sideRes = await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[2]/div[1]/div/div[3]/div[2]/div")).getText()
    let ratio = await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[1]/div[3]/div[1]/div/div[2]/div[2]")).getText()
    ratio = ratio.slice(2)
    let potentialWin = await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[1]/div[3]/div[1]/div/div[3]/div[2]/div[1]/div")).getText()
    let potentialWinRes = ratio * myPos

    await expect(predictInMyPos).toEqual(predictInMain)
    await expect(predictOnPairMyPos).toEqual(predictOnPairMain)
    await expect(conditionalPriceMyPos).toEqual(conditionalPriceMain)
    await expect(conditionalPriceRes).toEqual(conditionalPriceMyPos)
    await expect(sideRes).toEqual('BULL')
    await expect(resPair).toEqual(pair)
    await expect(myPosRes).toEqual(myPos)
    await expect(timeframeRes).toEqual(timeframeMyPos)
    await expect(timeframeMyPos).toEqual(timeframeMain)
    await expect(myPos).toEqual(participantVolume)
    await expect('1.00').toEqual(ratio)
    await expect(potentialWin).toEqual(potentialWinRes.toString())

    await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div[2]/div[2]/button")).click()
    sleep(2000)
    let tables = await driver.getAllWindowHandles();
    await driver.switchTo().window(tables[2]);
    await driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div/div[4]/div[3]/footer/button[2]")).click()
    sleep(2000)
    await driver.switchTo().window(tables[1]);
    sleep(5000)
    await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[1]/div/div[4]/button")).click()
    sleep(2000)
    let closedPoolsSide = await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[7]/div[2]/table/tbody/tr[1]/td[8]")).getText()
    let closedPoolsAmount = await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[7]/div[2]/table/tbody/tr[1]/td[4]/div")).getText()
    await expect(closedPoolsSide).toEqual("BULL") // проверка в Closed pool что ставка на быков
    await expect(closedPoolsAmount).toEqual(participantVolume) // проверка в Closed pool что правильно указано количество монет на ставке
  },35000)
})
