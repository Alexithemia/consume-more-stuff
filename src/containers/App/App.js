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
import CategoryView from '../../containers/CategoryView';
import MessagesView from '../../containers/MessagesView';
import MessagesFromUserView from '../MessagesFromUserView';
import AdminUserView from '../../containers/AdminUserView';
import EditUserView from '../../containers/EditUserView';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRoute: ''
    };

    this.selectNav = this.selectNav.bind(this)
  }



  componentDidMount() {
    return this.props.onLoad();
  }

  selectNav(e) {
    this.setState({
      selectedRoute: e.target.innerHTML
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <>
            <Header title={"CMS"} isLoggedIn={this.props.isLoggedIn} username={this.props.username} selectNav={this.selectNav} />

            <div className="mainContainer">
              <Navigation categories={this.props.categories} isLoggedIn={this.props.isLoggedIn} selected={this.state.selectedRoute} selectNav={this.selectNav} />
              <Switch>
                <Route exact={true} path='/register' component={Register} />
                <Route exact={true} path='/login' component={Login} />
                <Route exact={true} path='/' component={Home} />
                <Route exact={true} path='/dashboard/messages' component={MessagesView} />
                <Route exact={true} path='/dashboard/settings' component={EditUserView} />
                <Route exact={true} path='/dashboard/messages/:id' component={MessagesFromUserView} />
                <Route exact={true} path='/category/:id' component={CategoryView} />
                <Route exact={true} path='/item/:id' component={ItemDetailView} />
                <Route exact={true} path='/search/:term' component={SearchPage} />
                <Route exact={true} path='/admin/users' component={AdminUserView} />
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
