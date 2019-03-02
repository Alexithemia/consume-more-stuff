import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddPost.scss';

import { addPost } from '../../actions';

class AddPost extends Component {
  constructor (props) {
    super(props);

    this.state = {
      title : '',
      description : '',
      price : '',
      images : [],
      manufacturer : '',
      model : '',
      dimensions : '',
      notes : ''
    };

    this.handleTitleOnChange = this.handleTitleOnChange.bind(this);
    this.handleDescriptionOnChange = this.handleDescriptionOnChange.bind(this);
    this.handlePriceOnChange = this.handlePriceOnChange.bind(this);
    this.handleManufacturerOnChange = this.handleManufacturerOnChange.bind(this);
    this.handleModelOnChange = this.handleModelOnChange.bind(this);
    this.handleDimensionsOnChange = this.handleDimensionsOnChange.bind(this);
    this.handleNotesOnChange = this.handleNotesOnChange.bind(this);
    this.handleFileChosenOnChange = this.handleFileChosenOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleTitleOnChange(e) {
    const value = e.target.value;
    this.setState({
      title : value
    })
  }

  handleDescriptionOnChange(e) {
    const value = e.target.value;
    this.setState({
      description : value
    })
  }

  handlePriceOnChange(e) {
    const value = e.target.value;
    this.setState({
      price : value
    })
  }

  handleManufacturerOnChange(e) {
    const value = e.target.value;
    this.setState({
      manufacturer : value
    })
  }

  handleModelOnChange(e) {
    const value = e.target.value;
    this.setState({
      model : value
    })
  }

  handleDimensionsOnChange(e) {
    const value = e.target.value;
    this.setState({
      dimensions : value
    })
  }

  handleNotesOnChange(e) {
    const value = e.target.value;
    this.setState({
      notes : value
    })
  }

  handleFileChosenOnChange(e) {
    const files = e.target.files;

    this.setState({
      images : files
    });
  }

  handleOnSubmit(e) {
    e.preventDefault();

    const { title, description, price, images, manufacturer, model, dimensions, notes } = this.state;

    this.props.onAdd({
      title : title,
      description : description,
      price : price,
      images : images,
      manufacturer : manufacturer,
      model : model,
      dimensions : dimensions,
      notes : notes
    })

    // clear input
    this.setState({
      title : '',
      description : '',
      price : '',
      images : [],
      manufacturer : '',
      model : '',
      dimensions : '',
      notes : '',
    })
  }

  render() {
    const { title, description, price, manufacturer, model, dimensions, notes } = this.state;

    return (
      <div className="form-wrap">
        <form id="add-post-form">
          <div className="left-half">
            <input onChange={ this.handleTitleOnChange } type="text" value={ title } placeholder="Title" />
            <textarea onChange={ this.handleDescriptionOnChange } name="description" value={ description } placeholder="Describe your post" cols="30" rows="10"></textarea>
            <input onChange={ this.handlePriceOnChange } type="text" value={ price } placeholder="Name your price" />
            <input onChange={ this.handleManufacturerOnChange } type="text" value={ manufacturer } placeholder="Manufacturer (Optional)" />
            <input onChange={ this.handleModelOnChange } type="text" value={ model } placeholder="Model (Optional)" />
            <input onChange={ this.handleDimensionsOnChange } type="text" value={ dimensions } placeholder="Product dimensions (Optional)" />
            <input onChange={ this.handleNotesOnChange } type="text" value={ notes } placeholder="Notes: Any last words?" />
          </div>

          <div className="right-half">
            <span className="text">Upload an image</span>
            <img src="https://i.imgur.com/cFxAsBo.png" alt="file not specified" />
            <input onChange={ this.handleFileChosenOnChange } type="file" form="add-post-form" multiple />
          </div>
        </form>

        <div className="submit-wrap">
          <input onClick={ this.handleOnSubmit } type="submit" value="SUBMIT" form="add-post-form" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd : (newPost) => {
      // ADD_POST object with a payload of `newPost`
      const actionObject = addPost(newPost);

      dispatch(actionObject);
    }
  };
}

AddPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);

export default AddPost;
