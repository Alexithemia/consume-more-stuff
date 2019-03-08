import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { loadCategories, deleteCategory } from '../../actions';
import EditCategory from '../EditCategory';
import AddCategory from '../AddCategory';
import './AdminCategoryView.scss'

class AdminCategoryView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editModal: false,
      id: '',
      categoryName: ''
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteOnSubmit = this.deleteOnSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories()
  }

  toggleModal(e) {

    this.setState({
      id: e.target.dataset.id,
      categoryName: e.target.dataset.name,
      editModal: !this.state.editModal
    });
  }

  closeModal() {
    this.setState({ editModal: false })
  }


  deleteOnSubmit(e) {
    this.props.deleteCategory(e.target.dataset.id)
  }

  render() {
    const categoryList = this.props.categories.map(category => {
      let createdAt = new Date(category.created_at);
      let updatedAt = new Date(category.updated_at);
      let id = category.id

      return (
        <div key={id} className="categoryContainer">
          <div className="categoryName">
            <div className="name">{category.name}</div>
          </div>
          <div className="btn">
            <button className="edit" data-id={id} data-name={category.name} onClick={this.toggleModal}>Edit </button>
          </div>
          <div className="btn">
            <button className="delete" onClick={this.deleteOnSubmit} data-id={id} >Delete</button>
          </div>
          <div className="category">
            <div className="created_at">Created on: {createdAt.toDateString()}</div>
          </div>
          <div className="category">
            <div className="updated_at">Last updated: {updatedAt.toDateString()}</div>
          </div>
        </div>
      )
    })
    return (
      <div className="editCategoryContainer">
        <div className="titleContainer">
          <h1 className="title">Categories</h1>
          <button className="add">+</button>
        </div>
        <div className="allCategoryContainer">
          {categoryList}
        </div>
        <ReactModal
          isOpen={this.state.editModal}
          contentLabel="edit-modal"
          onRequestClose={this.state.closeEditModal}
          className="edit-modal"
          overlayClassName="overlay"
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
        >
          <EditCategory id={this.state.id} name={this.state.categoryName} close={this.closeModal} />
        </ReactModal>

        <div className="addCategoryContainer">
          <AddCategory categories={this.props.categories} />
        </div>
      </div >
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
    },
    deleteCategory: (id) => {
      const actionObject = deleteCategory(id);
      return dispatch(actionObject);
    }
  }
}

AdminCategoryView = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCategoryView);

export default AdminCategoryView;