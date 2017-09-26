import React, { Component } from 'react';
import axios from 'axios';
import PostList from './PostList';
import PostForm from './PostForm';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newPost: false,
      loggingIn: false,
      viewingArchive: false
    };
    this.loadBlogPosts = this.loadBlogPosts.bind(this);
    this.loadArchive = this.loadArchive.bind(this);
    this.url = this.props.url;
  }

  loadBlogPosts() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({
          data: res.data,
          viewingArchive: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  loadArchive() {
    axios.get(this.props.url + '/archive')
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

  writeNewPost() {
    this.setState({ newPost: !this.state.newPost });
  }

  viewArchive() {
    this.setState({ viewingArchive: !this.state.viewingArchive });
    this.loadArchive();
  }

  render() {
    return (
      <div className="container">
        <div className="blog-masthead">
          <div className="container">
            <nav className="blog-nav">
              <a className="blog-nav-item" href="#" onClick={this.loadBlogPosts}>Home</a>
              <a className="blog-nav-item" href="#" onClick={this.viewArchive.bind(this)}>Archive</a>
              <a className="blog-nav-item" href="#" onClick={this.writeNewPost.bind(this)}>Write</a>

            </nav>
          </div>
        </div>
        <div className="blog-header">
          <h3 className="blog-title">jacob's blog</h3>
        </div>
        <div className="col-sm-8 container row">
          {
            (this.state.newPost)
              ? <PostForm onPostSubmit={this.handlePostSubmit.bind(this)}/>
              : null
          }

          <PostList posts={this.state.data} editPost={this.handlePostEdit.bind(this)} deletePost={this.handlePostDelete.bind(this)}/>
          <nav>
            {
              (this.state.viewingArchive)
                ? <p className="text-center"><a href="#" onClick={this.loadBlogPosts}>Back</a></p>
                : <p className="text-center"><a href="#" onClick={this.viewArchive.bind(this)}>Archived Posts</a></p>
            }
          </nav>
        </div>
        <div className="col-sm-3 col-sm-offset-1 blog-sidebar">
          <div className="sidebar-module sidebar-module-inset">
            <form>
              <p className="text-right"><span>id: </span> <input type="text"/></p>
              <p className="text-right"><span>pw: </span> <input type="password"/></p>
              <p className="text-right"><input type="submit" value="Log In"/></p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog;
