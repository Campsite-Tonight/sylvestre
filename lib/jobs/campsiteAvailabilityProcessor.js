const superagent = require('superagent');

const getCampsiteAvailabilities = id => {
  return superagent
    .get(`https://www.recreation.gov/api/camps/availability/campground/${id}/month?start_date=2020-08-01T00%3A00%3A00.000Z`)
    .then(res => res.body);
  // .then(({ results }) => (
  //   results.map(result => result.entity_id)));
};

getCampsiteAvailabilities(233895)
  .then(ids => {
    const campsiteArray = Object.keys(ids.campsites); 
    return campsiteArray.map(id =>({ campsiteId: id, availabilities: Object.entries(ids.campsites[id].availabilities) }));
  })
  .then(res => (res.map(campsite => ({ campsiteId: campsite.campsiteId, availabilities: campsite.availabilities.filter(([date, isAvailable]) => isAvailable === 'Available') }))))
  .then(campsites => campsites.filter(campsite => campsite.availabilities.length > 0))
  .then(console.log);

module.exports = getCampsiteAvailabilities;


