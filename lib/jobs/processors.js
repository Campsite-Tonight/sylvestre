const { 
  queue,
  queue2  
} = require('../queue');
  
const path = require('path');
  
queue.process(1, path.resolve('./lib/jobs/campgroundProcessor.js'));
queue2.process(1, path.resolve('./lib/jobs/campsiteProcessor.js'));

  
  
