const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', async (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  const post = { id, title }
  posts[id] = post;

  await axios.post('http://localhost:4005/events', { type: 'PostCreated', data: post });
  res.status(201).send(id);
});

app.post('/events', (req, res) => {
  console.log('Received event:', req.body.type);
  res.send({});
})

app.listen(4000, () => {
  console.log('Latest V5');
  console.log('listening on part 4000');
});