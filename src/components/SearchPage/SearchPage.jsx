import React, { Component } from 'react';
import './SearchPage.scss';

class SearchPage extends Component {


  componentWillMount() {

  }

  render() {

    return (
      <div className="searchContainer">



      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

SearchPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);

export default SearchPage;