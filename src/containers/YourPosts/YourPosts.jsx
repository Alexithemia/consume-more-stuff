import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPostsWithStatus } from '../../actions';
import './YourPosts.scss';

class YourPosts extends Component {
  constructor (props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    // query database for all status id's and invoke this function for every status id that comes back
    return this.props.loadByStatus(2);
  }

  render() {
    console.log(`props is...`);
    console.log(this.props);

    return (
      <div className="your-posts">
        <div className="pending-wrap">
          <div className="title">Published Items</div>
          <div className="posts-container"></div>
        </div>

        <div className="posts-wrap">
          <div className="title">Pending Items</div>
          <div className="posts-container"></div>
        </div>

        <div className="sold-wrap">
          <div className="title">Sold Items</div>
          <div className="posts-container"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadByStatus : (status_id) => {
      const actionObject = loadPostsWithStatus(status_id);

      return dispatch(actionObject);
    }
  };
}

YourPosts = connect(
  mapStateToProps,
  mapDispatchToProps
)(YourPosts);

export default YourPosts;
