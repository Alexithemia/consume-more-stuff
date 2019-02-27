import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import Home from '../../components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Header title={"CMS"} />
          <Navigation />
        </div>
        <div>
          <Home />
        </div>
      </div>


    );
  }
}

export default App;
