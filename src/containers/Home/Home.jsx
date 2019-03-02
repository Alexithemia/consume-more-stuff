import React, { Component } from 'react';
import './Home.scss';

class Home extends Component {

  render() {
    const category = this.props.category;

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

export default Home;