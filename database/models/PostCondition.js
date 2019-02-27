const bookshelf = require('./bookshelf');
require('./Post');

class PostCondition extends bookshelf.Model {
  get tableName() { return 'postConditions'; }
  get timeStamps() { return true; }

  post() {
    return this.hasMany('Post');
  }
}

module.exports = bookshelf.model('PostCondition', PostCondition);