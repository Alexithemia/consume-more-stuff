const bookshelf = require('./bookshelf');
require('./Post');

class Category extends bookshelf.Model {
  get tableName() { return 'categories'; }
  get timeStamps() { return true; }

  post() {
    return this.hasMany('Post');
  }
}

module.exports = bookshelf.model('Category', Category);