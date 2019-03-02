import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import './ItemDetailView.scss';
import { loadPost } from '../../actions';

class ItemDetailView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 1,
      user: 'Eunice',
      title: 'Camera',
      image: ['https://images.unsplash.com/photo-1547214117-a112f358e61b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=693&q=80',
        'https://images.unsplash.com/photo-1487951611556-2667d7712c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/reserve/jsygaVpSPKes2SCJeihQ_EM2C5950.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1490401476932-bbc58979db84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1494375856376-7d2b3a016fa3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1541785329306-188b94fac0e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'],
      price: '150',
      description: 'Vintage Camera Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis massa in metus tempor, luctus volutpat tellus rutrum. Integer molestie, ligula a varius sodales, risus sem interdum sem, et tempor nunc nunc sed odio. Sed nec mi eu ante consectetur maximus eget id nibh. Nulla feugiat tellus nunc, in sollicitudin urna sagittis non. Ut eu tortor nec nibh varius consequat. Nunc felis augue, tristique eget eros sit amet, faucibus sodales lectus. Nulla suscipit faucibus leo condimentum ultricies. Duis massa elit, malesuada ac dui ac, scelerisque ullamcorper mi. Ut tempus risus felis, eget dapibus enim tempor eu. Suspendisse potenti. Proin iaculis varius augue sit amet tempor. Phasellus venenatis enim nunc, ut tincidunt nisl facilisis luctus. Nam sollicitudin augue ipsum, nec element',
      note: 'Accepting only cash and shipping from the US',
      condition: 4,
      category: 3,
      manufacturer: 'Canon',
      model: 'SB200',
      dimensions: 'dimension sample',
      category_id: 1
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    return this.props.loadPost(this.props.id)
  }

  render() {


    return (
      <div className="itemDetailViewContainer">
        <div className="mainContainer">
          <div className="imgNavBar">
            <img src={this.state.image[0]} alt="Thumbnail View 1:" className="navImg" />
            <img src={this.state.image[1]} alt="Thumbnail View 2:" className="navImg" />
            <img src={this.state.image[2]} alt="Thumbnail View 3:" className="navImg" />
            <img src={this.state.image[3]} alt="Thumbnail View 4:" className="navImg" />
            <img src={this.state.image[4]} alt="Thumbnail View 5:" className="navImg" />
            <img src={this.state.image[5]} alt="Thumbnail View 6:" className="navImg" />
          </div>
          <img className="img" src={this.state.image[0]} alt="Thumbnail View 1:" />
          <div className="titleContainer">
            <h1 className="title">{this.state.title}</h1>

            <div className="user">by {this.state.user}</div>
            <div className="descriptionContainer">
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

const mapStateToProps = (state) => {
  console.log(state)
  const { posts } = state
  return {
    post: posts
  }
}

const mapDispatchToProps = (dispatch) => {
  // let postId = this.state;
  // console.log(postId)
  return {
    loadPost: () => {
      const actionObject = loadPost();
      return dispatch(actionObject);

      // dispatch(loadPost(id));

    }
  }
}

ItemDetailView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetailView);

export default ItemDetailView;