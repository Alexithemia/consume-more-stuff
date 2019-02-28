
exports.seed = function (knex, Promise) {
  return knex('userStatus').del()
    .then(function () {
      return knex('userStatus').insert([
        { id: 1, name: 'blocked' },
        { id: 2, name: 'notBlocked' },
      ]);
    });
};
