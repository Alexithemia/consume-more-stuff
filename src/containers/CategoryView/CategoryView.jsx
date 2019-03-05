import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCategory } from '../../actions';
import PostList from '../../components/PostList';
import CategoryTitle from '../../components/CategoryTitle';
import './CategoryView.scss';

class CategoryView extends Component {
  // constructor(props) {
  //   super(props)
  // }

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
    console.log('RENDER SELECTEDCATEGORY', selectedCategory)
    const categoryTitle = this.props.selectedCategory
      .filter(title => {
        return title.category.name
      })

    return (
      <div className="homeContainer">
        <div className="categoryContainer">
          <div className="itemTitle">
            <CategoryTitle categoryTitle={categoryTitle}></CategoryTitle>
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
    selectedCategory: state.selectedCategory
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