import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCategories } from '../../actions';

class AdminCategoryView extends Component {

  componentDidMount() {
    this.props.loadCategories()
  }

  render() {
    console.log(this.props.categories)
    const categoryList = this.props.categories.map(category => {
      return category.name
    })
    return (
      <div className="mainContainer">
        <h1 className="title">Categories</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => {
      const actionObject = loadCategories();
      return dispatch(actionObject);
    }
  }
}

AdminCategoryView = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCategoryView);

export default AdminCategoryView;