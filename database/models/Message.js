const bookshelf = require('./bookshelf');
require('./User');
require('./Post');

class Message extends bookshelf.Model {
  get tableName() { return 'messages' }
  get timeStamps() { return true; }

  toUser() {
    return this.belongsTo('User', 'to_user_id', 'id');
  }

  fromUser() {
    return this.belongsTo('User', 'from_user_id', 'id');
  }

  post() {
    return this.belongsTo('Post', 'post_id', 'id');
  }
}

module.exports = bookshelf.model('Message', Message);