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
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.loadCategory(this.props.match.params.id)
    }
  }

  render() {
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
            <PostList posts={this.props.posts}></PostList>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
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