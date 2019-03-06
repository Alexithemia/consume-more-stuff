import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ItemDetailView.scss';
import { loadPost } from '../../actions';
import ImageList from '../../components/ImageList';
import ReactImageMagnify from 'react-image-magnify';
import EditPost from '../../containers/EditPost';

class ItemDetailView extends Component {
  constructor(props) {
    super(props)

    this.state = {

      showEditModal: false,
      showMessageModal: false,
      selectedImg: ""
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
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
      } else {
        this.setState({ selectedImg: "https://s3-us-west-2.amazonaws.com/alexithemia-cms-imagestore/no-image.jpg" })
      }
    }
  }

  toggleModal() {
    return this.setState({
      showMessageModal: !this.state.showMessageModal
    });
  }

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

    const { category, description, dimensions, image, manufacturer, model, title, price, postCondition, postStatus, user, notes, views, created_at, updated_at, user_id } = this.props.selectedPost;
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
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="secondContainer">
              <h2 className="descriptionTitle">Product description</h2>
              <div className="productDescription">
                <div className="condition">
                  Condition: <span className="dynamic-data">{postCondition.name}</span>
                </div>
                <div className="manufacturer">
                  Manufacturer: <span className="dynamic-data">{manufacturer}</span>
                </div>
                <div className="model">
                  Model: <span className="dynamic-data">{model}</span>
                </div>
                <div className="dimension">
                  Dimensions: <span className="dynamic-data">{dimensions}</span>
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