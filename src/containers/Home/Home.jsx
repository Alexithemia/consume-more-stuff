import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import { loadPosts } from '../../actions';
import PostList from '../../components/PostList';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      category: "",
      description: "",
      notes: "",
      title: "",
      price: "",
      postCondition: "",
      postStatus: "",
      user: "",
      image: "",
      views: ""
    }
  }

  componentWillMount() {
    return this.props.loadPosts();
  }

  render() {
    // const { category, photo, description, notes, title, price, postCondition, postStatus, user, views } = this.props.viewPosts;
    console.log(this.props.posts)

    const posts = this.props.posts;


    return (
      <div className="homeContainer">

        <div className="categoryContainer">
          <div className="itemTitle">
            < h1 className="title" > Trending </h1 >
          </div>

          <div className="itemContainer">
            <PostList posts={posts}></PostList>
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