const bookshelf = require('./bookshelf');
require('./User');

class UserStatus extends bookshelf.Model {
  get tableName() { return 'userStatus'; }
  get timeStamps() { return true; }

  post() {
    return this.hasMany('User');
  }
}

module.exports = bookshelf.model('UserStatus', UserStatus);