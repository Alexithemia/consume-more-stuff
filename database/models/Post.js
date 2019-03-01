const bookshelf = require('./bookshelf');
require('./User');
require('./Category');
require('./PostStatus');
require('./PostCondition');
require('./Image');

class Post extends bookshelf.Model {
  get tableName() { return 'posts'; }
  get timestamps() { return true; }

  user() {
    return this.belongsTo('User', 'user_id', 'id');
  }

  category() {
    return this.belongsTo('Category', 'category_id', 'id');
  }

  postStatus() {
    return this.belongsTo('PostStatus', 'post_status_id', 'id');
  }

  postCondition() {
    return this.belongsTo('PostCondition', 'post_condition_id', 'id');
  }

  image() {
    return this.hasMany('Image');
  }
}

module.exports = bookshelf.model('Post', Post)