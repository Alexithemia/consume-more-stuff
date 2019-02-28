import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Header from '../../components/Header';
import Navigation from '../Navigation';
import { loadCategories } from '../../actions';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log(`App.js props are...\n`); console.log(this.props)
    return (
      <div className="App">
        <Header title={ "CMS" } />
        <Navigation categories={ this.props.categories } />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories : state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad : () => {
      const actionObject = loadCategories();

      return dispatch(actionObject);
    }
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
