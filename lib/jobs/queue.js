require('dotenv').config();

const Queue = require ('bull');
const { setQueues } = require('bull-board');

const options = ({ max, durationInMinutes, attempts = 1 }) => (
  {
    limiter: {
      max,
      duration: 1000 * 60 * durationInMinutes
    },
    defaultJobOptions: {
      attempts,
      removeOnComplete: true,
      removeOnFail: 100
    }
  }
);

const queue = new Queue('campground fetch', process.env.REDIS_URL, options({ durationInMinutes: 1 }));
const campsiteQueue = new Queue('campsite fetch', process.env.REDIS_URL, options({ durationInMinutes: 1 }));

setQueues([
  queue,
  campsiteQueue
]);

module.exports = {
  queue,
  campsiteQueue
};


