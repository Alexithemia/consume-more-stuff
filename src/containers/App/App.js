import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import Home from '../../components/Home';
import Login from '../../components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <>
            <Header title={"CMS"} />
            <div className="mainContainer">
              <Navigation />
              <Switch>
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

export default App;
