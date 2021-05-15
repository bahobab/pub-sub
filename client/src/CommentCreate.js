import React from 'react';
import axios from 'axios';

function CommentCreate({postId}) {
  const [comment, setComment] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('>>cmment', {comment})
    await axios.post(`http://posts.com/posts/${postId}/comments`, { comment });

    setComment('');    
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" className="form-control" />
        </div>
      <button className="btn btn-primary" >News Comment</button>
      </form>
    </div>
  )
}

export default CommentCreate
