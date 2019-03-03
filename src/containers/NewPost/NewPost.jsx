import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import './NewPost.scss';
import { loadConditions } from '../../actions';

import AddPost from '../AddPost';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  handleToggleModal() {
    return this.setState({
      showModal: !this.state.showModal
    });
  }

  componentWillMount() {
    return this.props.loadFormData();
  }

  render() {
    return (
      <div className="newPostWrap">
        <div onClick={this.handleToggleModal} className="textWrap">
          <span className="text">+ New Post</span>
        </div>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="modal"
          onRequestClose={this.handleToggleModal}
          className="modal"
          overlayClassName="overlay"
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
        >
          <div className="headerContainer">
            <span className="headerText">MAKE A NEW POST</span>
          </div>
          <AddPost closeModal={this.handleToggleModal} categories={this.props.categories} postConditions={this.props.postConditions} />
        </ReactModal>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadFormData: () => {
      const actionObject = loadConditions();

      dispatch(actionObject);
    }
  };
}

NewPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);

export default NewPost;
