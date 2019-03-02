import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import './ItemDetailView.scss';
import { loadPost } from '../../actions';

class ItemDetailView extends Component {


  componentWillMount() {
    this.props.loadPost(this.props.match.params.id)

  }

  render() {
    console.log(this.props.selectedPost);
    const { category, description, dimensions, image, manufacturer, model, title, price, postCondition, postStatus, user, notes, views, created_at, updated_at } = this.props.selectedPost;

    return (
      <div className="itemDetailViewContainer">
        {this.props.selectedPost.user && (
          <div>
            <div className="mainContainer">

              <div className="imgNavBar">
                <a href="#img">
                  <img src={image} alt="Thumbnail View 1:" className="navImg" />
                </a>
                <a href="#img">
                  <img src={image} alt="Thumbnail View 2:" className="navImg" />
                </a>
                <img src={image} alt="Thumbnail View 3:" className="navImg" />
                <img src={image} alt="Thumbnail View 4:" className="navImg" />
                <img src={image} alt="Thumbnail View 5:" className="navImg" />
                <img src={image} alt="Thumbnail View 6:" className="navImg" />
              </div>
              <img id="img" className="img" src={image} alt="Thumbnail View 1:" />
              <div className="titleContainer">
                <h1 className="title">{title}: {postStatus.name}</h1>
                <div className="user">by {user.username}</div>
                <div className="descriptionContainer">
                  <div className="price">Price: ${price}</div>
                  <div className="category">Category: {category.name}</div>
                  <div className="description">{description}</div>
                  <div className="posted">Posted: {created_at}</div>
                  <div className="updated">Last updated: {updated_at}</div>
                  <div className="notes">Note: {notes}</div>
                  <div className="views">Viewed: {views}</div>
                  <div className="messageContainer"> Message Me
              {/* <Link className="MessageLink">Message Me</Link> */}

                  </div>
                </div>
              </div>
            </div>
            <div className="secondContainer">
              <h2 className="descriptionTitle">Product description</h2>
              <div className="productDescription">
                <div className="condition">
                  Condition: {postCondition.name}
                </div>
                <div className="manufacturer">
                  Manufacturer: {manufacturer}
                </div>
                <div className="model">
                  Model: {model}
                </div>
                <div className="dimension">
                  Dimensions: {dimensions}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    selectedPost: state.selectedPost
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPost: (id) => {
      const actionObject = loadPost(id);
      return dispatch(actionObject);
    }
  }
}

ItemDetailView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetailView);

export default ItemDetailView;