import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import { loadCategories } from '../../actions';
import Home from '../../components/Home';
import Login from '../../components/Login';
import Register from '../../components/Register';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    return this.props.onLoad();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <>
            <Header title={"CMS"} isLoggedIn={this.props.isLoggedIn} username={this.props.username} />
            <div className="mainContainer">
              <Navigation categories={this.props.categories} isLoggedIn={ this.props.isLoggedIn } />
              <Switch>
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <Route path='/' component={Home} />
              </Switch>
            </div>
          </>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    username: state.username,
    isLoggedIn: state.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
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
