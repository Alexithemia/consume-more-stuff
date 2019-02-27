const bookshelf = require('./bookshelf');
require('./User');
require('./Post');

class Message extends bookshelf.Model {
  get tableName() { return 'messages' }
  get timeStamps() { return true; }

  toUser() {
    return this.belongsTo('User', 'id', 'to_user_id');
  }

  fromUser() {
    return this.belongsTo('User', 'id', 'from_user_id');
  }

  post() {
    return this.belongsTo('Post', 'id', 'post_id');
  }
}

module.exports = bookshelf.model('Message', Message);