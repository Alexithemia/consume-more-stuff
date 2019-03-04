import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { searchPost } from '../../actions';
import './SearchBar.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: ''
    }

    // reference to focus the search bar
    this.searchRef = createRef();

    this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
    this.handleOnSearchClick = this.handleOnSearchClick.bind(this);
  }

  handleSearchOnChange(e) {
    const value = e.target.value;

    this.setState({ searchInput: value });
  }

  handleOnSearchClick(e) {
    e.preventDefault();

    this.props.searchPost(this.state.searchInput)
    this.props.history.push(`/search/${this.state.searchInput}`)
  }

  componentDidMount() {
    this.searchRef.current.focus();
  }

  render() {
    return (
      <div className="searchWrap">
        <form className="searchBar">
          <input ref={this.searchRef} onChange={this.handleSearchOnChange} data-type="searchInput" type="text" value={this.state.searchInput} placeholder="Search..." className="search" />
          <input onClick={this.handleOnSearchClick} type="submit" className="submitButton" value=""></input>
        </form>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchPost: (term) => {
      const actionObject = searchPost(term);
      return dispatch(actionObject);
    }
  }
};


SearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default withRouter(SearchBar);
