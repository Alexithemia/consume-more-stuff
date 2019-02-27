const bookshelf = require('./bookshelf');
require('./User');
require('./Category');
require('./PostStatus');
require('./PostCondition');

class Post extends bookshelf.Model {
  get tableName() { return 'posts'; }
  get timestamps() { return true; }

  user() {
    return this.belongsTo('User', 'id', 'user_id');
  }

  category() {
    return this.belongsTo('Category', 'id', 'category_id');
  }

  postStatus() {
    return this.belongsTo('PostStatus', 'id', 'post_status_id');
  }

  postCondition() {
    return this.belongsTo('PostCondition', 'id', 'post_condition_id');
  }
}

module.exports = bookshelf.model('Post', Post)