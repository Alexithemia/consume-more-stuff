import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.scss';

import { loadPosts } from '../../actions';

class Home extends Component {
  constructor (props) {
    super(props);

    this.state = ({});
  }

  componentDidMount() {
    return this.props.loadPosts();
  }

  render() {
    const category = this.props.category;

    console.log(this.props);

    return (
      <div className="homeContainer">

        <div className="categoryContainer">
          <div className="itemTitle">
            <h1 className="title">Top X Items in ... {category}</h1>
          </div>

          <div className="itemContainer">
            <div className="itemContent">
              <div className="photo"> photo sample
            {/* <img src="" alt=""/> */}
              </div>
              <div className="message">
                message sample
            </div>
            </div>
            <div className="itemContent">
              <div className="photo"> photo sample
            {/* <img src="" alt=""/> */}
              </div>
              <div className="message">
                message sample
            </div>
            </div>
            <div className="itemContent">
              <div className="photo"> photo sample
            {/* <img src="" alt=""/> */}
              </div>
              <div className="message">
                message sample
            </div>
            </div>
            <div className="itemContent">
              <div className="photo"> photo sample
            {/* <img src="" alt=""/> */}
              </div>
              <div className="message">
                message sample
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts : state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPosts : () => {
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