import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadStatuses, loadUserPosts } from '../../actions';
import './YourPosts.scss';

import SortedPosts from '../../components/SortedPosts';

class YourPosts extends Component {
  constructor (props) {
    super(props);

    this.state = {}

    this.sortPostsByStatusId = this.sortPostsByStatusId.bind(this);
  }

  sortPostsByStatusId(id) {
    console.log(this.props.posts);
    
    return this.props.posts.filter(post => {
      const { post_status_id } = post;

      return id === post_status_id;
    });
  }

  componentDidMount() {
    this.props.loadStatuses();
    this.props.loadPostsByUser();

    // need to filter posts by status like we filtered Cards on React: Kanban on each column
    // probably copy the 3 column system: Published Items, Pending Items, Sold Items
    // write a function to filter the posts by status id and place them on each column's props
    // for example:
    // const functionForSortingPosts = (id) => { return posts.filter(post => { return post.status_id === id }); }
    // <Column title="published" status_id={ 1 } posts={ this.functionForSortingPosts(status_id) } />
    // <Column title="pending" status_id={ 2 } posts={ this.functionForSortingPosts(status_id) } />
    // <Column title="sold" status_id={ 3 } posts={ this.functionForSortingPosts(status_id) } />
  }

  render() {
    return (
      <div className="your-posts">
        {/* <div className="pending-wrap">
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
        </div> */}

        <div className="pending-wrap">
          <SortedPosts title="Published Items" posts={ this.sortPostsByStatusId(1) } />
        </div>

        <div className="current-wrap">
          <SortedPosts title="Items on Sale" posts={ this.sortPostsByStatusId(2) } />
        </div>

        <div className="sold-wrap">
          <SortedPosts title="Sold Items" posts={ this.sortPostsByStatusId(3) } />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postStatuses : state.postStatuses,
    posts : state.posts
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadStatuses : () => {
      const actionObject = loadStatuses();

      return dispatch(actionObject);
    },
    loadPostsByUser : () => {
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
