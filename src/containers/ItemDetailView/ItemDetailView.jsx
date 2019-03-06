import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ItemDetailView.scss';
import { loadPost } from '../../actions';
import ImageList from '../../components/ImageList';
<<<<<<< HEAD
import ReactImageMagnify from 'react-image-magnify';
=======
import EditPost from '../../containers/EditPost';
>>>>>>> development

class ItemDetailView extends Component {
  constructor(props) {
    super(props)

<<<<<<< HEAD
=======
    this.state = {

      showEditModal: false,
      showMessageModal: false,
      selectedImg: ""
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
>>>>>>> development
    this.changePhoto = this.changePhoto.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    this.props.loadPost(this.props.match.params.id)
  }

  componentDidUpdate() {
    if (this.state.selectedImg === "" && this.props.selectedPost.image) {
      if (this.props.selectedPost.image[0]) {
        this.setState({ selectedImg: this.props.selectedPost.image[0].url })
<<<<<<< HEAD
=======

>>>>>>> development
      } else {
        this.setState({ selectedImg: "https://s3-us-west-2.amazonaws.com/alexithemia-cms-imagestore/no-image.jpg" })
      }
    }
  }
<<<<<<< HEAD
=======

  toggleModal() {
    return this.setState({
      showMessageModal: !this.state.showMessageModal
    });
  }
>>>>>>> development

  handleToggleModal() {

    this.setState({ showEditModal: !this.state.showEditModal });
  }

  changePhoto(e) {
    this.setState({ selectedImg: e.target.src })
  }

  deletePost() {
    console.log(this.props.selectedPost.id);
  }

  render() {
<<<<<<< HEAD
    const { id, category, description, dimensions, image, manufacturer, model, title, price, postCondition, postStatus, user, notes, views, created_at, updated_at, user_id } = this.props.selectedPost;
=======

    const { category, description, dimensions, image, manufacturer, model, title, price, postCondition, postStatus, user, notes, views, created_at, updated_at, user_id } = this.props.selectedPost;
>>>>>>> development
    return (
      <div className="itemDetailViewContainer">
        {this.props.selectedPost.user && (
          <div>
            <div className="mainContainer">
              <div className="imgNavBar">
                <ImageList images={image} changePhoto={this.changePhoto}></ImageList>
              </div>
              <div className="imgBox">
                <ReactImageMagnify  {...{
                  smallImage: {
                    alt: '',
                    isFluidWidth: true,
                    src: this.state.selectedImg,
                  },
                  largeImage: {
                    src: this.state.selectedImg,
                    width: 800,
                    height: 400
                  }
                }} />
              </div>
              <div className="titleContainer">
                <h1 className="title">{title}: {postStatus.name}</h1>
                <div className="user">by {user.username}</div>
                <div className="descriptionContainer">
<<<<<<< HEAD
                  <div className="price">Price: ${price}</div>
                  <div className="category">Category: {category.name}</div>
                  <div className="description">{description}</div>
                  <div className="posted">Posted: {created_at}</div>
                  <div className="updated">Last updated: {updated_at}</div>
                  <div className="notes">Note: {notes}</div>
                  <div className="views">Viewed: {views}</div>
                  {this.props.selectedPost.user_id === this.props.id || this.props.isAdmin ?
=======

                  <div className="price">
                    Price: <span className="dynamic-data">${price}</span>
                  </div>

                  <div className="category">
                    Category: <span className="dynamic-data">{category.name}</span>
                  </div>

                  <div className="description">
                    Description: <span className="dynamic-data">{description}</span>
                  </div>

                  <div className="posted">
                    Posted: <span className="dynamic-data">{created_at}</span>
                  </div>

                  <div className="updated">
                    Last updated: <span className="dynamic-data">{updated_at}</span>
                  </div>

                  <div className="notes">
                    Note: <span className="dynamic-data">{notes}</span>
                  </div>

                  <div className="views">
                    Viewed: <span className="dynamic-data">{views} times</span>
                  </div>

                  {user_id === this.props.id || this.props.isAdmin ?
>>>>>>> development
                    <div className="options">
                      <div onClick={this.handleToggleModal} className="editPost">Edit</div>
                      <ReactModal
                        isOpen={this.state.showEditModal}
                        contentLabel="modal"
                        onRequestClose={this.handleToggleModal}
                        className="modal"
                        overlayClassName="overlay"
                        shouldCloseOnOverlayClick={true}
                        ariaHideApp={false}
                      >
                        <div className="headerContainer">
                          <span className="headerText">EDIT POST</span>
                        </div>
                        <EditPost closeModal={this.handleToggleModal} post={this.props.selectedPost} />
                      </ReactModal>
                      <div className="deletePost" onClick={this.deletePost}>Delete</div>
                    </div>
                    :
                    <div className="options">
<<<<<<< HEAD
                      <Link to={`/message/${user_id}/${id}`} className="messagePoster">Message Me</Link>
=======
                      {/* <Link to={`/message/${ user }/${ id }`} className="messagePoster">Message Me</Link> */}
                      <div className="messagePosterContainer">
                        <button onClick={this.toggleModal} className="messagePoster">
                          Message Me
                        </button>

                        <ReactModal
                          isOpen={this.state.showMessageModal}
                          onRequestClose={this.toggleModal}
                          className="message-modal"
                          overlayClassName="overlay"
                          shouldCloseOnOverlayClick={true}
                          ariaHideApp={false}
                        >
                          <ItemSendMessage />
                        </ReactModal>
                      </div>
>>>>>>> development
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="secondContainer">
              <h2 className="descriptionTitle">Product description</h2>
              <div className="productDescription">
                <div className="condition">
<<<<<<< HEAD
                  Condition: {postCondition.name}
=======
                  Condition: <span className="dynamic-data">{postCondition.name}</span>
>>>>>>> development
                </div>
                <div className="manufacturer">
<<<<<<< HEAD
                  Manufacturer: {manufacturer}
=======
                  Manufacturer: <span className="dynamic-data">{manufacturer}</span>
>>>>>>> development
                </div>
                <div className="model">
<<<<<<< HEAD
                  Model: {model}
=======
                  Model: <span className="dynamic-data">{model}</span>
>>>>>>> development
                </div>
                <div className="dimension">
<<<<<<< HEAD
                  Dimensions: {dimensions}
=======
                  Dimensions: <span className="dynamic-data">{dimensions}</span>
>>>>>>> development
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
    isAdmin: state.isAdmin,

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