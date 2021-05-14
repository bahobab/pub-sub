import React from 'react';
// import axios from 'axios';

function CommentList({ comments }) {
  // const [comments, setComments] = useState([]);

  // const getComments = async () => {
  //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

  //     setComments(res.data);
  //   }

  // useEffect(() => {
  //   getComments();
  // }, []);

  const renderedComments = comments.map(comment => {
    return (
      <li key={comment.id}>{comment.comment}</li>
    )
  });

  return (
    <div>
      <ul>
      {renderedComments}
      </ul>
    </div>
  )
}

export default CommentList;
