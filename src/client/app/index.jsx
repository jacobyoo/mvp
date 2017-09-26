import React from 'react';
import ReactDOM from 'react-dom';
import Blog from './Blog';

ReactDOM.render(
  <Blog url="http://localhost:3000/blog/posts"/>,
  document.getElementById('app')
);
