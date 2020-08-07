const { findCampgroundAvailability } = require('./lib/utils/campsiteUtils');

findCampgroundAvailability()
  .then(console.log)
  .catch(console.log);
