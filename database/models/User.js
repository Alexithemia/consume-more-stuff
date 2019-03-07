const bookshelf = require('./bookshelf');
require('./UserStatus');
require('./Post');

class User extends bookshelf.Model {
  get tableName() { return 'users'; }
  get timeStamps() { return true; }

  status() {
    return this.belongsTo('UserStatus', 'status_id', 'id');
  }

  postByUser() {
    return this.hasMany('Post')
  }
}

module.exports = bookshelf.model('User', User)