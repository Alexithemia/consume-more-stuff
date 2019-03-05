import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import { loadPosts } from '../../actions';
import TrendingList from '../../components/TrendingList';

class Home extends Component {

  componentWillMount() {
    return this.props.loadPosts();
  }

  render() {
    const posts = this.props.posts;

    return (
      <div className="homeContainer">
        <div className="categoryContainer">
          <div className="itemTitle">
            < h1 className="title" > Trending </h1 >
          </div>

          <div className="itemContainer">
            <TrendingList posts={posts}></TrendingList>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPosts: () => {
      const actionObject = loadPosts();
      return dispatch(actionObject);
    }
  }
}

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default Home;