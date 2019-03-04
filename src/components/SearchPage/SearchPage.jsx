import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchPage.scss';
import PostList from '../../components/PostList';

class SearchPage extends Component {

  render() {
    return (
      <div className="searchContainer">
        <div className="itemTitle">
          < h1 className="title" > Search results for {this.props.match.params.term} </h1 >
        </div>
        {this.props.posts.length > 0 ?
          <div className="itemContainer">
            <PostList posts={this.props.posts}></PostList>
          </div>
          :
          <div className="noResult">No results</div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

SearchPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);

export default SearchPage;