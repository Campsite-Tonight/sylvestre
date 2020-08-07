const {
  queue,
  queue2
} = require('./lib/jobs/queue.js');
  

  
Promise.all([
  queue.empty(),
  queue2.empty()
])
  .then(() => queue.add({}))
  .then(() => console.log('Clackamas County jobs added'))
  .then(() => Promise.all(queue2.map(id => queue2.add({ id }))))
  .then(() => console.log('Washington County jobs added'))
  .catch(error => console.log('Error adding jobs', error))
  .finally(() => Promise.all(([
    queue.close(),
    queue2.close()
  ])));
  
  
  
  
  
  
