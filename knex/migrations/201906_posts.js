exports.up = function (knex, Promise) {
  return knex.schema.createTable('posts', function (table) {
    table.increments().unique().notNullable();
    table.integer('category_id').references('id').inTable('categories').notNullable();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.integer('post_status_id').references('id').inTable('postStatus').notNullable();
    table.integer('post_condition_id').references('id').inTable('postConditions').notNullable();
    table.string('title').notNullable();
    table.string('content', 5000).nullable();
    table.integer('views').notNullable().defaultTo(0);
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('posts');
};
