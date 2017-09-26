import React, { Component } from 'react';
import axios from 'axios';
import PostList from './PostList';
import PostForm from './PostForm';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadBlogPosts = this.loadBlogPosts.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
  }

  loadBlogPosts() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }

  handlePostSubmit() {
    //TODO: save posts to db
  }

  componentDidMount() {
    this.loadBlogPosts();
  }

  render() {
    return (
      <div>
        <h3>A Tiny Blog</h3>
        <PostList posts={this.state.data}/>
      </div>
    )
  }
}

export default Blog;
