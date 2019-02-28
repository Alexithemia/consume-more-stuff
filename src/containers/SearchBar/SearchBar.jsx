import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import './SearchBar.scss';

class SearchBar extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchInput : ''
    }

    // reference to focus the search bar
    this.searchRef = createRef();

    this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
    this.handleOnSearchClick = this.handleOnSearchClick.bind(this);
  }

  handleSearchOnChange(e) {
    const value = e.target.value;

    this.setState({ searchInput : value });
  }

  handleOnSearchClick() {
    this.setState({ searchInput : '' });
  }

  componentDidMount() {
    this.searchRef.current.focus();
  }

  render() {
    return (
      <div className="searchWrap">
        <form className="searchBar">
          <input ref={ this.searchRef } onChange={ this.handleSearchOnChange } data-type="searchInput" type="text" value={ this.state.searchInput } placeholder="Start typing..." className="search" />
        </form>
        <div className="searchIcon">
          <img onClick={ this.handleOnSearchClick } src="https://image.flaticon.com/icons/svg/126/126474.svg" alt="search icon" srcSet=""/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

SearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default SearchBar;
