exports.up = function (knex, Promise) {
  return knex.schema.createTable('postConditions', function (table) {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('postConditions');
};
