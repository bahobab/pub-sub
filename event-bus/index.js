const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const events = [];

app.get('/events', (req, res) => {
  res.send(events);
})

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
    console.log('POSTING', err.message);
  });
  // axios.post('http://localhost:4001/events', event).catch((err) => {
  //   console.log('POSTING', err.message);
  // });
  // axios.post('http://localhost:4002/events', event).catch((err) => {
  //   console.log('POSTING', err.message);
  // });
  // axios.post('http://localhost:4003/events', event).catch((err) => {
  //   console.log('POSTING', err.message);
  // });

  res.status(200).send({});
})

app.listen(4005, () => {
  console.log('EVENT-BUS V3');
  console.log('Event Server listening on port 2005');
});