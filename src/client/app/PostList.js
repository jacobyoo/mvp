import React, { Component } from 'react';
import BlogPost from './BlogPost';

var PostList = (props) => (
  <div>
    {props.posts.map(post =>
      <BlogPost post={post} key={post._id} />
    )}
  </div>
)

export default PostList;
