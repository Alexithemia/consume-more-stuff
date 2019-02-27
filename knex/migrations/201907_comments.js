exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', function (table) {
    table.increments().unique().notNullable();
    table.integer('user_id').references('id').inTable('users');
    table.integer('post_id').references('id').inTable('posts');
    table.string('body', 1000).notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
