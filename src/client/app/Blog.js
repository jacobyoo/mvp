import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import PostList from './PostList';
import PostForm from './PostForm';
import LogIn from './LogIn';
import LoggedIn from './LoggedIn';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newPost: false,
      isLoggedIn: false,
      userName: null,
      viewingArchive: false
    };
    this.loadBlogPosts = this.loadBlogPosts.bind(this);
    this.loadArchive = this.loadArchive.bind(this);
    this.url = this.props.url;
  }

  componentDidMount() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    axios.get(this.props.url + 'posts')
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
    axios.get(this.props.url + 'posts/archive')
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handlePostSubmit(post) {
    axios.post(this.props.url + 'posts', post)
      .then(this.loadBlogPosts)
      .then(this.setState({ newPost: false }))
      .catch(err => {
        console.log(err);
      });
  }

  handlePostEdit(id, post) {
    axios.put(this.props.url + 'posts/' + id, post)
      .then(this.loadBlogPosts)
      .catch(err => {
        console.log(err);
      });

  }

  handlePostDelete(e) {
    axios.delete(this.props.url + 'posts/' + e.target.id)
      .then(this.loadBlogPosts)
      .catch(err => {
        console.log(err);
      });

  }

  handleLogIn(user) {
    axios.post(this.props.url + 'login', user)
      .then(res => {
        this.setState({
          isLoggedIn: true,
          userName: user.username
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleLogOut() {
    axios.get(this.props.url + 'logout')
      .then(res => {
        this.setState({
          isLoggedIn: false,
          userName: null
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  writeNewPost() {
    this.setState({ newPost: !this.state.newPost });
  }

  viewArchive() {
    this.setState({ viewingArchive: true });
    this.loadArchive();
  }

  handle

  render() {
    return (
      <div>
        <div className="blog-header">
          <h3 className="blog-title">mvmblr.</h3>
        </div>
        <div className="blog-masthead">
          <nav className="blog-nav">
            <a className="blog-nav-item" href="#" onClick={this.loadBlogPosts}>Home</a>
            <a className="blog-nav-item" href="#" onClick={this.viewArchive.bind(this)}>Archive</a>
            {
              (this.state.isLoggedIn)
                ? <a className="blog-nav-item" href="#" onClick={this.writeNewPost.bind(this)}>Write</a>
                : null
            }

          </nav>
        </div>
        <div>
          {
            (this.state.isLoggedIn)
              ? <LoggedIn userName={this.state.userName} onLogOutClick={this.handleLogOut.bind(this)} />
              : <LogIn onLogInSubmit={this.handleLogIn.bind(this)} />
          }
        </div>
        <div className="col-sm-8 container row">
          <Modal
            isOpen={this.state.newPost}
            onRequestClose={this.writeNewPost.bind(this)}
            style={{
              content : {
                top                   : '10%',
                left                  : '10%',
                right                 : '10%',
                bottom                : '50%'
              }
            }}
            contentLabel="Write Post"
          >
            <PostForm onPostSubmit={this.handlePostSubmit.bind(this)}/>
          </Modal>


          <PostList posts={this.state.data} editPost={this.handlePostEdit.bind(this)} deletePost={this.handlePostDelete.bind(this)} user={this.state.userName}/>
          <nav>
            {
              (this.state.viewingArchive)
                ? <p className="text-center"><a href="#" onClick={this.loadBlogPosts}>Back</a></p>
                : <p className="text-center"><a href="#" onClick={this.viewArchive.bind(this)}>Archived Posts</a></p>
            }
          </nav>
        </div>
      </div>
    )
  }
}

export default Blog;
