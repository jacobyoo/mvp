import React, { Component } from 'react';
import Time from 'react-time';

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
  }

  updatePost(e) {
    e.preventDefault();
    this.setState( {updatePending: !this.state.updatePending});
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
          <a href="#" onClick={this.updatePost}>edit</a>&nbsp;
          <a href="#" id={this.props.post._id} onClick={this.props.deletePost}>delete</a>
        </p>
        { (this.state.updatePending)
          ? (<form onSubmit={this.handleUpdatePost}>
            <input className="form-control" type="text" value={this.props.post.title} onChange={this.handleTitleChange}/>
            <textarea className="form-control" rows="15" type="text" value={this.props.post.body} onChange={this.handleBodyChange}/>
            <input type="submit" value="Update"/>
          </form>)
          : null
        }
      </div>
    )
  }
}


export default BlogPost;
