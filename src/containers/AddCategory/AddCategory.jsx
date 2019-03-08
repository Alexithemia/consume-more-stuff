import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCategory, deleteCategory } from '../../actions';
import './AddCategory.scss';

class AddCategory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categoryName: '',
    }

    this.addNewCategory = this.addNewCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addNewCategory(e) {
    const value = e.target.value;
    switch (e.target.name) {
      case 'category':
        this.setState({ categoryName: value })
        break;
      default:
        break;
    }
  }

  deleteOnSubmit(e) {
    console.log(e.target)
    // this.props.deleteCategory()
  }

  handleSubmit(e) {
    e.preventDefault();

    const category = {};
    category.name = this.state.categoryName;

    this.props.addCategory(category)
    this.setState({
      categoryName: '',
    })

  }

  render() {
    console.log(this.props)
    return (
      <div className="addFormContainer">
        <h1 className="addTitle">ADD NEW CATEGORY HERE</h1>
        <form className="add-category">
          <div className="name">NAME:
          <input type="text" name="category" className="add" value={this.state.categoryName} onChange={this.addNewCategory} />
          </div>
          <div className="btnContainer">
            <button className="submit" onClick={this.handleSubmit}>SUBMIT</button>
          </div>
        </form>
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
    addCategory: (category) => {
      const actionObject = addCategory(category);
      return dispatch(actionObject);
    },
    deleteCategory: (id) => {
      const actionObject = deleteCategory(id);
      return dispatch(actionObject);
    }
  }
}

AddCategory = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategory);

export default AddCategory;