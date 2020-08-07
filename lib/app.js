const express = require('express');
const app = express();

const { UI } = require('bull-board');
const { findCampgroundAvailability } = require('./utils/campsiteUtils');
app.use('/', UI);

app.use(express.json());

app.post('/campgrounds', (req, res, next) => {
  const { state, limit } = req.body;

  findCampgroundAvailability(state, limit)
    .then(response => res.send(response.flat()));
});

// app.use('/api/v1/RESOURCE', require('./routes/RESOURCE'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
