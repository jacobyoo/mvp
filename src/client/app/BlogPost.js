import React from 'react';

var BlogPost = (props) => (
  <div className="blog-post">
    <h3 className="blog-post-title">{props.post.title}</h3>
    <p>
      {props.post.body}
    </p>
    <p className="blog-post-meta">
      <em>Posted {props.post.date}</em>&nbsp;
      <a className="edit-post">edit</a>&nbsp;
      <a className="delete-post" href="#" id={props.post._id} onClick={props.deletePost}>delete</a>
    </p>
  </div>
)

export default BlogPost;
