import React, { Component } from 'react';

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
    console.log('changing to ' + e.target.value);
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
    console.log('changing to ' + e.target.value);
  }

  handleSubmit(e) {
    //TODO: save new data to db
    e.preventDefault();
    let title = this.state.title.trim();
    let body = this.state.body.trim();

    this.props.onPostSubmit({ title: title, body: body });
    this.setState({ title: '', body: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="form-control" type="text" placeholder="title" value={this.state.title} onChange={this.handleTitleChange}/>
        <input className="form-control" rows="10" type="text" placeholder="body" value={this.state.body} onChange={this.handleBodyChange}/>
        <input type="submit" value="Post"/>
      </form>
    )
  }
}

export default PostForm;
