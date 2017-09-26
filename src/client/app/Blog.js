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

  handlePostEdit(id, post) {
    axios.put(this.props.url + '/' + id, post)
      .then(this.loadBlogPosts)
      .catch(err => {
        console.log(err);
      });

  }

  handlePostDelete(e) {
    axios.delete(this.props.url + '/' + e.target.id)
      .then(this.loadBlogPosts)
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
        <div className="blog-masthead">
          <div className="container">
            <nav className="blog-nav">
              <a className="blog-nav-item" href="#">Home</a>
              <a className="blog-nav-item" href="#">About</a>
              <a className="blog-nav-item" href="#">Archive</a>
              <a className="blog-nav-item" href="#">Write</a>
              <a className="blog-nav-item" href="#">Log out</a>
            </nav>
          </div>
        </div>
        <div className="blog-header">
          <h3 className="blog-title">jacob's blog</h3>
        </div>
        <div className="container row">
          <PostList posts={this.state.data} editPost={this.handlePostEdit.bind(this)} deletePost={this.handlePostDelete.bind(this)}/>
          <PostForm onPostSubmit={this.handlePostSubmit.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default Blog;
