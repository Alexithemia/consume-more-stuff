const bookshelf = require('./bookshelf');
require('./Post');

class PostStatus extends bookshelf.Model {
  get tableName() { return 'postStatus'; }
  get timeStamps() { return true; }

  post() {
    return this.hasMany('Post');
  }
}

module.exports = bookshelf.model('PostStatus', PostStatus);