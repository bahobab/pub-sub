const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    }
  }
  if (type === 'CommentCreated') {
    const { comment: { id, comment }, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, comment });
  }

  if (type === 'CommentUpdated') {
    console.log('Query:', type);
    console.log(data)
    const { postId, comment: { id, status, comment } } = data;

    const post = posts[postId];
    const commentToUpdate = post.comments.find(comment => {
      comment.id === id;
    });

    commentToUpdate.status = status;
    commentToUpdate.comment = comment;
  }
};

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  // console.log('Query service Posts:', posts);
  res.send({});
})

app.get('/posts', (req, res) => {
  res.send(posts );
})

app.listen(4002, async () => {
  console.log("Query service listening on port 4002");

  const res = await axios.get('http://localhost:4005/events');

  for (let event of res.data) {
    console.log('Processing event:', event.type);

    handleEvent(event.type, event.data);
  }
});
