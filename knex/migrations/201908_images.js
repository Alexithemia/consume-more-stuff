
exports.up = function (knex, Promise) {
  return knex.schema.createTable('images', function (table) {
    table.increments().notNullable();
    table.string('url').notNullable();
    table.integer('post_id').references('id').inTable('posts').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('images');
};
