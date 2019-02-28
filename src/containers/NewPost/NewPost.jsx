import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NewPost.scss';

class NewPost extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="newPostWrap">
        <div className="textWrap">
          <span className="text">+ New Post</span> 
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

NewPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);

export default NewPost;
