import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { loadCategories } from '../../actions';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import Home from '../../containers/Home';
import Login from '../../components/Login';
import Register from '../../components/Register';
import SearchPage from '../../components/SearchPage';
import ItemDetailView from '../../containers/ItemDetailView';

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
              <Navigation categories={this.props.categories} isLoggedIn={this.props.isLoggedIn} />
              <Switch>
                <Route exact={true} path='/register' component={Register} />
                <Route exact={true} path='/login' component={Login} />
                <Route exact={true} path='/' component={Home} />
                <Route exact={true} path='/item/:id' component={ItemDetailView} />
                <Route exact={true} path='/search/:term' component={SearchPage} />
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
