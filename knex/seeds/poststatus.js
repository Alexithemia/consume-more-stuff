
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('postStatus').del()
    .then(function () {
      // Inserts seed entries
      return knex('postStatus').insert([
        { id: 1, name: 'Pending' },
        { id: 2, name: 'For Sale' },
        { id: 3, name: 'Sold' }
      ]);
    });
};
