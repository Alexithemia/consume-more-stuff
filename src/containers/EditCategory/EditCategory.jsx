import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editCategories } from '../../actions';
import './EditCategory.scss'

class EditCategory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categoryName: this.props.name,
      id: this.props.id
    }

    this.editCategory = this.editCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  editCategory(e) {
    const value = e.target.value;
    switch (e.target.name) {
      case 'category':
        this.setState({ categoryName: value })
        break;
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const category = {};
    category.id = this.state.id
    category.name = this.state.categoryName;
    this.props.editCategories(category)
      .then(() => {
        this.props.close()
      })
  }

  render() {
    return (
      <div className="editFormContainer">
        <div className="headerContainer">
          <span className="headerText">EDIT CATEGORY: {this.props.name}</span>
        </div>
        <div className="formContainer">
          <form className="edit-form">
            <div className="category-name"> Name:
                <input type="text" name="category" className="category" onChange={this.editCategory} value={this.state.categoryName} />
            </div>
            <div className="button-container">
              <button className="submit" onClick={this.handleSubmit}>SUBMIT</button>
            </div>
          </form>
        </div>
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
    editCategories: (category) => {
      const actionObject = editCategories(category);
      return dispatch(actionObject);
    }
  }
}

EditCategory = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCategory);

export default EditCategory;