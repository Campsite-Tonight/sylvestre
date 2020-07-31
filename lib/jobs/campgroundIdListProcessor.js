const superagent = require('superagent');

const getCampgroundIds = () => {
  return superagent
    .get('https://www.recreation.gov/api/search?q=oregon&exact=false&size=300&fq=-entity_type%3Atour&fq=campsite_type_of_use%3AOvernight&fq=campsite_type_of_use%3Ana&fq=entity_type%3Acampground&start=0')
    .then(res => res.body)
    .then(({ results }) => (
      results.map(result => result.entity_id)));
};

// getCampgroundIds()
//   .then(ids => console.log(ids));

module.exports = getCampgroundIds;


