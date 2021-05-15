const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('>>',data);
  
  if (type === 'CommentCreated') {
    const { comment: { id, comment } } = data;
    // console.log(data.comment);
    const status = comment.includes('orange') ? 'rejected' : 'approved';
    const moderatedEvent = {
      type: 'CommentModerated',
      data: {
        comment: {
          id,
          comment,
          status
        },
        postId: data.postId
      },
    }
    
    await axios.post('http://event-bus-srv:4005/events', moderatedEvent);

    console.log('moderated',moderatedEvent);

    res.send({});
  }
});

app.listen(4003, () => {
  console.log('Moderation: listening on port 4003');
});
