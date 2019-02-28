const bookshelf = require('./bookshelf');
require('./UserStatus');

class User extends bookshelf.Model {
  get tableName() { return 'users'; }
  get timeStamps() { return true; }

  status() {
    return this.belongsTo('UserStatus', 'id', 'status_id');
  }
}

module.exports = bookshelf.model('User', User)