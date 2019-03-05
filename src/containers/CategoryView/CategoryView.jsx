import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCategory } from '../../actions';
import PostList from '../../components/PostList';
import './CategoryView.scss';

class CategoryView extends Component {

  componentDidMount() {
    this.props.loadCategory(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    //Refreshes page if User clicks on another category link
    if (prevProps.location.key !== this.props.location.key) {
      window.location.reload();
    }
  }

  render() {
    const selectedCategory = this.props.selectedCategory;

    let categoryTitle = ''
    for (var i = 0; i < this.props.categories.length; i++) {
      if (this.props.categories[i].id !== 0) {
        if (this.props.categories[i].id === parseInt(this.props.match.params.id)) {
          categoryTitle = this.props.categories[i].name
        }
      }
    }

    return (
      <div className="homeContainer">
        <div className="categoryContainer">
          <div className="itemTitle">
            <h1 className="title">{categoryTitle}</h1>
          </div>
          <div className="itemContainer">
            <PostList selectedCategory={selectedCategory}></PostList>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.selectedCategory,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategory: (id) => {
      const actionObject = loadCategory(id);
      return dispatch(actionObject);
    }
  }
}

CategoryView = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryView);

export default CategoryView;