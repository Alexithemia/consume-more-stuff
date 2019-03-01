const bookshelf = require('./bookshelf');
require('./Post');

class Image extends bookshelf.Model {
  get tableName() { return 'images'; }
  get timeStamps() { return true; }

  post() {
    return this.belongsTo('Post', 'post_id', 'id');
  }
}

module.exports = bookshelf.model('Image', Image);