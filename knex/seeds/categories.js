
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { id: 1, name: 'Vehicles' },
        { id: 2, name: 'Electronics' },
        { id: 3, name: 'Appliances' },
        { id: 4, name: 'Pet Products' },
        { id: 5, name: 'HeEdshots' }
      ]);
    });
};
