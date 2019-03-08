import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadStatuses, loadUserPosts } from '../../actions';
import './YourPosts.scss';

import SortedPosts from '../../components/SortedPosts';

class YourPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPost: {}
    }

    this.sortPostsByStatusId = this.sortPostsByStatusId.bind(this);
  }

  sortPostsByStatusId(id) {
    return this.props.posts.filter(post => {
      const { post_status_id } = post;

      return id === post_status_id;
    });
  }

  componentDidMount() {
    this.props.loadStatuses()

    this.props.loadPostsByUser();
  }

  render() {
    return (
      <div className="your-posts">
        <div className="pending-wrap">
          <SortedPosts title="Pending Items" posts={this.sortPostsByStatusId(1)} />
        </div>

        <div className="current-wrap">
          <SortedPosts title="Items on Sale" posts={this.sortPostsByStatusId(2)} />
        </div>

        <div className="sold-wrap">
          <SortedPosts title="Sold Items" posts={this.sortPostsByStatusId(3)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postStatuses: state.postStatuses,
    posts: state.posts
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadStatuses: () => {
      const actionObject = loadStatuses();

      return dispatch(actionObject);
    },
    loadPostsByUser: () => {
      const actionObject = loadUserPosts();

      return dispatch(actionObject);
    }
  };
}

YourPosts = connect(
  mapStateToProps,
  mapDispatchToProps
)(YourPosts);

export default YourPosts;
