const cheerio = require('cheerio');
const superagent = require('superagent');
// const Throttle = require('superagent-throttle');
// const { makeDate, makeDateWithTime, numifyBail, makeTimeless } = require('../../utils/dataShapers');
// const { shapeRace } = require('../../utils/shapeRace');
// const { shapeAgency } = require('../../utils/shapeAgency');
// const { shapeGender } = require('../../utils/shapeGender');
// const { shapeFacility } = require('../../utils/shapeFacility');


// let throttle = new Throttle({
//   active: true,  
//   rate: 5,
//   ratePer: 1000,
//   concurrent: 5  
// });

const scrapeAvailability = siteNo => {
  const url = `https://www.recreation.gov/camping/campgrounds/${siteNo}/availability`;
  return superagent
    .get(url)
    // .use(throttle.plugin())
    .retry(3)
    .then(response => cheerio.load(response.body))
    .then(html => makeAvailabilityObject(html));
};

const makeAvailabilityObject = html => {
  return ({
    dates: html('#availability-table tr').get()
      .map(el => {
        return html(el).find('td .available .rec-availability-date').text();
      })
  });
};

scrapeAvailability(233735)
  .then(console.log);

module.exports = scrapeAvailability;
