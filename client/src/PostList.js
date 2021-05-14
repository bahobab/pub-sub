import React from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentsList from './CommentsList';

function PostList() {
  const [posts, setPosts] = React.useState({});


  React.useEffect(() => {
    const getPosts = async () => {
      const {data} = await axios.get('http://localhost:4002/posts');

      console.log(data)
      setPosts(data);
    }
    
    getPosts();
    
  },[]);
  
  const renderedPosts = Object.values(posts).map((post) => {
    console.log('<<',post )
    return (
      <div key={post.id} className="card">
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentsList comments={post.comments} />
          <hr />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    )
  });

  return (
    <div>
      <h2>Posts:</h2>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
      </div>
    </div>
  )
}

export default PostList;
