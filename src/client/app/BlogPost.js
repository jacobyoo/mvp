import React from 'react';

var BlogPost = (props) => (
  <div className="blog-entry">
    <div>{props.post.title}</div>
    <div> Posted {props.post.date} </div>
    <div>
      {props.post.body}
    </div>
  </div>
)

export default BlogPost;
