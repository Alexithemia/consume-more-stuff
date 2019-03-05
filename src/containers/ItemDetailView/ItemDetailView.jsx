import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './ItemDetailView.scss';

import { loadPost } from '../../actions';
import ItemSendMessage from '../ItemSendMessage';
import ImageList from '../../components/ImageList';

class ItemDetailView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal : true,
      selectedImg: ""
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentWillMount() {
    this.props.loadPost(this.props.match.params.id)
  }
  
  componentDidUpdate() {
    if (this.state.selectedImg === "" && this.props.selectedPost.image) {
      if (this.props.selectedPost.image[0]) {
        this.setState({ selectedImg: this.props.selectedPost.image[0].url })
        
      } else {
        this.setState({ selectedImg: "https://s3-us-west-2.amazonaws.com/alexithemia-cms-imagestore/no-image.jpg" })
        
      }
    }
  }
  
  toggleModal() {
    return this.setState({
      showModal : !this.state.showModal
    });
  }

  changePhoto(e) {
    this.setState({ selectedImg: e.target.src })
  }

  deletePost() {
    console.log(this.props.selectedPost.id);
  }

  render() {
    const { id, category, description, dimensions, image, manufacturer, model, title, price, postCondition, postStatus, user, notes, views, created_at, updated_at, user_id } = this.props.selectedPost;

    return (
      <div className="itemDetailViewContainer">
        {this.props.selectedPost.user && (
          <div>
            <div className="mainContainer">
              <div className="imgNavBar">
                <ImageList images={image} changePhoto={this.changePhoto}></ImageList>
              </div>
              <div className="imgBox">
                <img id="img" className="img" src={this.state.selectedImg} alt="" />
              </div>
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
                  {this.props.selectedPost.user_id === this.props.id || this.props.isAdmin ?
                    <div className="options">
                      <Link to={`/edit/${id}`} className="editPost">Edit</Link>
                      <div className="deletePost" onClick={this.deletePost}>Delete</div>
                    </div>
                    :
                    <div className="options">
                      {/* <Link to={`/message/${ user }/${ id }`} className="messagePoster">Message Me</Link> */}
                      <div className="messagePosterContainer">
                        <button onClick={ this.toggleModal } className="messagePoster">
                          Message Me
                        </button>

                        <ReactModal
                          isOpen={ this.state.showModal }
                          onRequestClose={ this.toggleModal }
                          className="modal"
                          overlayClassName="overlay"
                          shouldCloseOnOverlayClick={ true }
                          ariaHideApp={ false }
                        >
                          <ItemSendMessage />
                        </ReactModal>
                      </div>
                    </div>
                  }
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
    selectedPost: state.selectedPost,
    id: state.id,
    isAdmin: state.isAdmin
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