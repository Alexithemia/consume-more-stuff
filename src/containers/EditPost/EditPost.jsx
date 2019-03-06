import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './EditPost.scss';

import CategoryList from '../../components/utilities/CategoryList';
import ConditionList from '../../components/utilities/ConditionList';
import StatusList from '../../components/utilities/StatusList';
import EditImageList from '../../components/EditImageList';
import { loadStatuses, editPost } from '../../actions';

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.post.title,
      description: this.props.post.decsription,
      price: this.props.post.price,
      photos: [],
      manufacturer: this.props.post.manufacturer,
      model: this.props.post.model,
      dimensions: this.props.post.dimensions,
      notes: this.props.post.notes,
      category_id: this.props.post.category_id,
      condition_id: this.props.post.post_condition_id,
      post_status_id: this.props.post.post_status_id,
      isTitleInvalid: false,
      isCategoryInvalid: false,
      isConditionInvalid: false,
      deleteImages: []
    };

    this.handleTitleOnChange = this.handleTitleOnChange.bind(this);
    this.handleDescriptionOnChange = this.handleDescriptionOnChange.bind(this);
    this.handlePriceOnChange = this.handlePriceOnChange.bind(this);
    this.handleManufacturerOnChange = this.handleManufacturerOnChange.bind(this);
    this.handleModelOnChange = this.handleModelOnChange.bind(this);
    this.handleDimensionsOnChange = this.handleDimensionsOnChange.bind(this);
    this.handleNotesOnChange = this.handleNotesOnChange.bind(this);
    this.handleFileChosenOnChange = this.handleFileChosenOnChange.bind(this);
    this.handleCategoryOnChange = this.handleCategoryOnChange.bind(this);
    this.handleConditionOnChange = this.handleConditionOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.checkTitleValid = this.checkTitleValid.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  componentWillMount() {
    return this.props.loadFormData();
  }

  handleTitleOnChange(e) {
    const value = e.target.value;

    this.setState({ title: value })
  }

  checkTitleValid() {
    if (this.state.title.length < 2) {
      this.setState({ isTitleInvalid: true })
    } else {
      this.setState({ isTitleInvalid: false })
    }
  }

  handleDescriptionOnChange(e) {
    const value = e.target.value;

    this.setState({ description: value })
  }

  handlePriceOnChange(e) {
    const value = e.target.value;

    this.setState({ price: value })
  }

  handleManufacturerOnChange(e) {
    const value = e.target.value;

    this.setState({ manufacturer: value })
  }

  handleModelOnChange(e) {
    const value = e.target.value;

    this.setState({ model: value })
  }

  handleDimensionsOnChange(e) {
    const value = e.target.value;

    this.setState({ dimensions: value })
  }

  handleNotesOnChange(e) {
    const value = e.target.value;

    this.setState({ notes: value })
  }

  handleFileChosenOnChange(e) {
    const files = e.target.files;

    this.setState({ photos: files });
  }

  handleCategoryOnChange(e) {
    const value = e.target.value;

    this.setState({ category_id: value }, () => {
      if (this.state.category_id === '') {
        this.setState({ isCategoryInvalid: true })
      } else {
        this.setState({ isCategoryInvalid: false })
      }
    })
  }

  handleConditionOnChange(e) {
    const value = e.target.value;

    this.setState({ condition_id: value }, () => {
      if (this.state.condition_id === '') {
        this.setState({ isConditionInvalid: true })
      } else {
        this.setState({ isConditionInvalid: false })
      }
    });

  }

  handleStatusOnChange(e) {
    const value = e.target.value;

    this.setState({ post_status_id: value })
  }

  handleImageClick(e) {
    let value = e.target.dataset.id;
    let target = e.target
    if (this.state.deleteImages.indexOf(value) === -1) {
      this.setState({ deleteImages: [...this.state.deleteImages, value] }, () => {
        target.classList.add('removed');
      })

    } else {
      this.state.deleteImages.splice(this.state.deleteImages.indexOf(value), 1);
      target.classList.remove('removed')
    }
  }

  handleOnSubmit(e) {
    e.preventDefault();

    const { title, description, price, photos, manufacturer, model, dimensions, notes, category_id, condition_id, post_status_id, deleteImages } = this.state;

    this.props.onEdit({
      id: this.props.post.id,
      title: title,
      description: description,
      price: price,
      photos: photos,
      manufacturer: manufacturer,
      model: model,
      dimensions: dimensions,
      notes: notes,
      category_id: category_id,
      post_condition_id: condition_id,
      post_status_id: post_status_id,
      deleteImages: deleteImages
    })
      .then(() => {
        this.props.history.push(`/`)
        this.props.history.push(`/item/${this.props.post.id}`)
      })
      .catch((err) => {
        console.log(err);
      })



  }

  render() {
    const { title, description, price, manufacturer, model, dimensions, notes, isTitleInvalid, isCategoryInvalid, isConditionInvalid } = this.state;

    return (
      <div className="form-wrap">
        <form id="add-post-form" encType="multipart/form-data">
          <div className="left-half">
            <input onChange={this.handleTitleOnChange} onKeyUp={this.checkTitleValid} type="text" value={title} placeholder="Title" />
            <textarea onChange={this.handleDescriptionOnChange} name="description" value={description} placeholder="Describe your post" cols="30" rows="10"></textarea>
            <input onChange={this.handlePriceOnChange} type="text" value={price} placeholder="Name your price" />
            <input onChange={this.handleManufacturerOnChange} type="text" value={manufacturer} placeholder="Manufacturer (Optional)" />
            <input onChange={this.handleModelOnChange} type="text" value={model} placeholder="Model (Optional)" />
            <input onChange={this.handleDimensionsOnChange} type="text" value={dimensions} placeholder="Product dimensions (Optional)" />
            <input onChange={this.handleNotesOnChange} type="text" value={notes} placeholder="Notes: Any last words?" />
          </div>

          <div className="right-half">
            <span className="text">Delete Images</span>
            <div className="imgEditBox">
              <EditImageList images={this.props.post.image} deleteImg={this.handleImageClick}></EditImageList>
              <div className="uploadImg">
                <span className="addImgText">Upload an image (max 6)</span>
                <img className="sampleImg" src="https://i.imgur.com/cFxAsBo.png" alt="file not specified" />
                <input onChange={this.handleFileChosenOnChange} type="file" form="add-post-form" multiple />
              </div>
            </div>

            {/* DISABLE SUBMIT BUTTON IF THE VALUE OF SELECT TAG IS "" */}
            <select onChange={this.handleCategoryOnChange} name="category_id" id="select-category" defaultValue={this.props.post.category_id}>
              <option value="">Choose a Category</option>
              <CategoryList categories={this.props.categories} />
            </select>

            <select onChange={this.handleConditionOnChange} name="condition_id" id="select-conditions" defaultValue={this.props.post.post_condition_id}>
              <option value="" >Choose a Condition</option>
              <ConditionList postConditions={this.props.postConditions} />
            </select>

            <select onChange={this.handleStatusOnChange} name="status_id" id="select-conditions" defaultValue={this.props.post.post_status_id}>
              <StatusList postStatuses={this.props.statuses} />
            </select>
          </div>
        </form>

        <div className="submit-wrap">
          {isCategoryInvalid || isConditionInvalid || isTitleInvalid ?
            <input className="disabled" type="submit" value="SUBMIT" form="add-post-form" disabled />
            :
            <input onClick={this.handleOnSubmit} type="submit" value="SUBMIT" form="add-post-form" />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postConditions: state.postConditions,
    categories: state.categories,
    statuses: state.postStatuses
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadFormData: () => {
      const actionObject = loadStatuses();

      return dispatch(actionObject);
    },
    onEdit: (editedPost) => {
      const actionObject = editPost(editedPost);

      return dispatch(actionObject);
    }
  };
}

EditPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);

export default withRouter(EditPost);
