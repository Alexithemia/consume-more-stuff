import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import './ItemDetailView.scss';
// import { loadPosts } from '../../actions';

class ItemDetailView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 1,
      user: 'Eunice',
      title: 'Camera',
      image: 'https://images.unsplash.com/photo-1547214117-a112f358e61b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=693&q=80',
      price: '150',
      description: 'Vintage Camera',
      note: 'Accepting only cash and shipping from the US',
      condition: 4,
      category: 3,
      manufacturer: 'Canon',
      model: 'SB200',
      dimensions: 'dimension sample',
      category_id: 1
    }

    // this.componentDidMount = this.componentDidMount.bind(this);
  }

  // componentDidMount() {
  //   return this.props.loadPosts()
  // }

  render() {
    return (
      <div className="itemDetailViewContainer">
        <div className="mainContainer">
          <img className="img" src={this.state.image} alt={this.state.image} />
          <div className="titleContainer">
            <h1 className="title">{this.state.title}</h1>

            <div className="user">by {this.state.user}</div>
            <div className="price">Price: ${this.state.price}</div>
            <div className="description">{this.state.description}</div>
            <div className="posted">Posted: {this.state.created_at}</div>
            <div className="updated">Last updated: {this.state.updated_at}</div>
            <div className="note">Note: {this.state.note}</div>
            <div className="messageContainer"> Message Me
              {/* <Link className="MessageLink">Message Me</Link> */}

            </div>
          </div>
        </div>
        <div className="secondContainer">
          <h2 className="descriptionTitle">Product description</h2>
          <div className="productDescription">
            <div className="condition">
              Condition: {this.state.condition}
            </div>
            <div className="manufacturer">
              Manufacturer: {this.state.manufacturer}
            </div>
            <div className="model">
              Model: {this.state.model}
            </div>
            <div className="dimension">
              Dimensions: {this.state.dimensions}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     posts: state.posts
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadPosts: () => {
//       const actionObject = loadPosts();

//       return dispatch(actionObject);
//     }
//   }
// }

// ItemDetailView = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ItemDetailView);

export default ItemDetailView;