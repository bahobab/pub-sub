// const express = require('express');
// const cors = require('cors');
// const {randomBytes} = require('crypto');

// const app = express();

// app.use(express.json());
// app.use(cors());

// const commentsById = {};

// app.get('/posts/:id/comments', (req, res) => {
  
//   res.status(200).send(commentsById[req.params.id] || []);
// });

// app.post('/posts/:id/comments', (req, res) => {
//   const commentId = randomBytes(4).toString('hex');

//   const { comment } = req.body;
//   const postId = req.params.id;
  
//   const comments = commentsById[postId] || [];
//   comments.push({ id: commentId, comment });
  
//   commentsById[postId] = comments

//   res.status(201).send(comments);
// });

// app.listen(4001, () => {
//   console.log('server listening on port 4001');
// });


const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  let { comment } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comment = { id: commentId, comment, status: 'pending' }

  comments.push(comment);

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://event-bus-srv:4005/events', { type: 'CommentCreated', data: {comment, postId: req.params.id} });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('Event created:', req.body.type);

  const { type, data } = req.body;

  if (type === 'EventModerated') {
    const { postId, comment: { id, status } } = data;
    
    const comments = commentsByPostId[postId];

    const updatedComment = comments.find(comment => {
      comment.id === id;
    });

    updatedComment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        comment: updatedComment,
        postId
      }
    })

    
  }
})

app.listen(4001, () => {
  console.log('Comment: Listening on 4001');
});

// https://leetcode.com/problems/basic-calculator/