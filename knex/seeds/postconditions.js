
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('postConditions').del()
    .then(function () {
      // Inserts seed entries
      return knex('postConditions').insert([
        { id: 1, name: 'new' },
        { id: 2, name: 'good' },
        { id: 3, name: 'fair' },
        { id: 4, name: 'worn' },
        { id: 5, name: 'used' }
      ]);
    });
};
