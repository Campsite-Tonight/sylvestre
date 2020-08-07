export const find = () => {
  return fetch('https://www.recreation.gov/api/search?q=oregon&exact=false&size=300&fq=-entity_type%3Atour&fq=campsite_type_of_use%3AOvernight&fq=campsite_type_of_use%3Ana&fq=entity_type%3Acampground&start=0')
    .then(res => res.json())
    .then(({ results }) => (
      results.map(result => ({
        name: result.name,
        city: result.city,
        campId: result.entity_id,
        type: result.entity_type
      }))
    ));
};

export const findCampgroundIds = () => {
  return fetch('https://www.recreation.gov/api/search?q=oregon&exact=false&size=300&fq=-entity_type%3Atour&fq=campsite_type_of_use%3AOvernight&fq=campsite_type_of_use%3Ana&fq=entity_type%3Acampground&start=0')
    .then(res => res.json())
    .then(({ results }) => (
      results.map(result => result.entity_id)));
};

export const findCampsiteAvailability = id => {
  return fetch(`https://www.recreation.gov/api/camps/availability/campground/${id}/month?start_date=2020-08-01T00%3A00%3A00.000Z`)
    .then(res => res.json());
  // .then(({ campsites }) => campsites);
};

// Object.entries(campsites).map((campId) => campId.availabilities);
