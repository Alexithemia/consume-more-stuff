exports.up = function (knex, Promise) {
  return knex.schema.createTable('categories', function (table) {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.boolean('deleted').defaultTo(false);
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('categories');
};
