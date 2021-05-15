const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

// {
  // "origin": /http:\/\/localhost:\d+\/\w+/
  // "origin": 'http://localhost:31752/posts',
  // "origin": "*"
// }
app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', async (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  console.log('POSTS: posting...', req.body);
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  const post = { id, title }
  posts[id] = post;

  await axios.post('http://event-bus-srv:4005/events', { type: 'PostCreated', data: post });
  res.status(201).send(id);
});

app.post('/events', (req, res) => {
  console.log('Received event:', req.body.type);
  res.send({});
})

app.listen(4000, () => {
  console.log('Latest V9');
  console.log('listening on part 4000');
});