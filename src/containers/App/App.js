import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Route, Link } from 'react-router-dom';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import { loadCategories } from '../../actions';
import Home from '../../components/Home';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    return this.props.onLoad();
  }

  render() {
    console.log(`App.js props are...\n`); console.log(this.props)
    return (
      <div className="App">

        <div>
          <Header title={ "CMS" } isLoggedIn={ this.props.isLoggedIn } username={ this.props.username } />
        <Navigation categories={ this.props.categories } />
        </div>
        <div>
          <Home />
        </div>
      </div>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories : state.categories,
    username : state.username,
    isLoggedIn : state.isLoggedIn
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
