import React, { Component } from 'react';
import './Navigation.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    }
  }

  getProps() {
    console.log(this.props);
  }

  render() {
    this.getProps();
    return (
      <div className="navigation">
        <div className="navTitle">
          Home
        </div>

        <ul className="navMenu">
          <li className="navItem">
            <span className="text">Item 1</span>
          </li>

          <li className="navItem">
            <span className="text">Item 2</span>
          </li>

          <li className="navItem">
            <span className="text">Item 3</span>
          </li>

          <li className="navItem">
            <span className="text">Item 4</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
