import React, { Component } from 'react';
import axios from 'axios';
import PostList from './PostList';
import PostForm from './PostForm';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadBlogPosts = this.loadBlogPosts.bind(this);
    this.url = this.props.url;
  }

  loadBlogPosts() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handlePostSubmit(post) {
    axios.post(this.props.url, post)
      .then(this.loadBlogPosts)
      .catch(err => {
        console.log(err);
      });
  }

  handlePostEdit(post_id) {

  }

  handlePostDelete(e) {
    var outer = this;
    axios.delete(this.props.url + '/' + e.target.id)
      .then(res => {
        console.log('post deleted');
        outer.loadBlogPosts();
      })
      .catch(err => {
        console.log(err);
      });

  }

  componentDidMount() {
    this.loadBlogPosts();
  }

  render() {
    return (
      <div className="container">
        <div className="blog-header">
          <h3 className="blog-title">A Tiny Blog</h3>
        </div>
        <div className="container row">
          <PostList posts={this.state.data} deletePost={this.handlePostDelete.bind(this)}/>
          <PostForm onPostSubmit={this.handlePostSubmit.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default Blog;
