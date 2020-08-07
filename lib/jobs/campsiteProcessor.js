require('dotenv').config();
const superagent = require('superagent');
const RawClackDetention = require('../../models/RawClackDetention');
const { queue2 } = require('../queue');

module.exports = async(job) => {

  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return superagent
    .post('https://web3.clackamas.us/roster/detail/inmates')
    .then(res => RawClackDetention.create({ 
      bookingNo: job.data.id, 
      county: 'clackamas', 
      json: res.body }))
    .then(rawDetention => queue2.add({ id: rawDetention._id  }, { jobId: rawDetention._id }));
};

