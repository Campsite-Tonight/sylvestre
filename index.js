const {
  queue,
  campsiteQueue
} = require('./lib/jobs/queue.js');
const { findCampgroundIds } = require('./lib/utils/campsiteUtils.js');
  

  
Promise.all([
  queue.empty(),
  campsiteQueue.empty()
])
  .then(() => findCampgroundIds())
  .then(() => console.log('Campground jobs added'))
  .catch(error => console.log('Error adding jobs', error))
  .finally(() => Promise.all(([
    queue.close(),
    campsiteQueue.close()
  ])));
  
  
  
  
  
  
