const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

Promise.resolve(
    nightmare
  .goto('https://www.imdb.com/')
  .wait('input[name=q]')
  .insert('input[name=q]', 'Атака титанов')
  .click('button[type=submit]')
  .wait("#main > div > div > table > tbody > tr")
  .wait(1000)
  .click('#main > div > div > table > tbody> tr:nth-child(1) > td > a')
  .wait('body')
  .evaluate(() => document.getElementsByTagName('body').innerHTML)
).then(response => {
    console.log(response)
    return nightmare.end()
})