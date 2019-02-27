const bookshelf = require('./bookshelf');
require('./User');
require('./Post');

class Comment extends bookshelf.Model {
  get tableName() { return 'comments' }
  get timeStamps() { return true; }

  user() {
    return this.belongsTo('User', 'id', 'user_id');
  }

  post() {
    return this.belongsTo('Post', 'id', 'post_id');
  }
}

module.exports = bookshelf.Model('Comment', Comment);