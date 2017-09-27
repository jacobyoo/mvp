import React, { Component } from 'react';
import ReactQuill from 'react-quill';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleBodyChange(value) {
    this.setState({ body: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let title = this.state.title.trim();
    let body = this.state.body.toString('html');

    this.props.onPostSubmit({ title: title, body: body });
    this.setState({ title: '', body: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="form-control" type="text" placeholder="title" value={this.state.title} onChange={this.handleTitleChange}/>
        <ReactQuill value={this.state.body} onChange={this.handleBodyChange}/>
        <input type="submit" className="btn btn-primary btn-m" value="Post"/>
      </form>
    )
  }
}

export default PostForm;
