import React, { Component } from 'react';
import BlogPost from './BlogPost';

var PostList = (props) => (
  <div className="blog-main">
    {props.posts.map(post =>
      <BlogPost post={post} key={post._id} user={props.user} editPost={props.editPost} deletePost={props.deletePost}/>
    )}
  </div>
)

export default PostList;
