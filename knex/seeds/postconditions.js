
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('postConditions').del()
    .then(function () {
      // Inserts seed entries
      return knex('postConditions').insert([
        { id: 1, name: 'New' },
        { id: 2, name: 'Good' },
        { id: 3, name: 'Fair' },
        { id: 4, name: 'Worn' },
        { id: 5, name: 'Used' }
      ]);
    });
};
