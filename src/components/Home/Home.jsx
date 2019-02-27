import React, { Component } from 'react';


class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const category = this.props.category;


    return (
      <div className="homeContainer">
        <div className="categoryContainer">
          <div className="itemTitle">
            <h1 className="containerTitle">Top X Items in {category}</h1>
          </div>
          <div className="itemcontainer">

          </div>
        </div>
      </div>
    )
  }
}

export default Home;