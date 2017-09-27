import React, { Component } from 'react';
import Time from 'react-time';
import Modal from 'react-modal';

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatePending: false,
      title: '',
      body: ''
    };
    this.updatePost = this.updatePost.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleUpdatePost = this.handleUpdatePost.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  updatePost(e) {
    e.preventDefault();
    this.setState({
      updatePending: !this.state.updatePending,
      title: this.props.post.title,
      body: this.props.post.body
    });
  }

  closeModal() {
    this.setState({
      updatePending: false
    });
  }

  handleUpdatePost(e) {
    e.preventDefault();
    let id = this.props.post._id;
    let title = (this.state.title) ? this.state.title : null;
    let body = (this.state.body) ? this.state.body : null;
    let post = { title: title, body: body };
    this.props.editPost(id, post);
    this.setState({
      updatePending: !this.state.updatePending,
      title: '',
      body: ''
    })
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  render() {
    return (
      <div className="blog-post">
        <h3 className="blog-post-title">{this.props.post.title}</h3>
        <p>
          {this.props.post.body}
        </p>
        <p className="blog-post-meta">
          <em>Posted on <Time value={this.props.post.date} format="YYYY/MM/DD hh:mm A"/></em>&nbsp;
          {
            (this.props.user)
              ? (<a href="#" onClick={this.updatePost}>edit</a>)
              : null
          }
          &nbsp;
          {
            (this.props.user)
              ? (<a href="#" id={this.props.post._id} onClick={this.props.deletePost}>delete</a>)
              : null
          }
        </p>
        <Modal
          isOpen={this.state.updatePending}
          onRequestClose={this.closeModal}
          style={{
            content : {
              top                   : '10%',
              left                  : '10%',
              right                 : '10%',
              bottom                : '50%'
            }
          }}
          contentLabel="Update Post"
        >
          (<form onSubmit={this.handleUpdatePost}>
            <input className="form-control" type="text" value={this.state.title} onChange={this.handleTitleChange}/>
            <textarea className="form-control" rows="15" type="text" value={this.state.body} onChange={this.handleBodyChange}/>
            <input type="submit" value="Update"/>
          </form>
        </Modal>
      </div>
    )
  }
}


export default BlogPost;
