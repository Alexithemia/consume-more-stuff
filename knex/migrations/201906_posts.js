exports.up = function (knex, Promise) {
  return knex.schema.createTable('posts', function (table) {
    table.increments().unique().notNullable();
    table.integer('category_id').references('id').inTable('categories');
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.integer('post_status_id').references('id').inTable('postStatus').notNullable().defaultTo(2);
    table.integer('post_condition_id').references('id').inTable('postConditions').notNullable();
    table.string('title').notNullable();
    table.string('description', 5000);
    table.string('price');
    table.string('manufacturer');
    table.string('model');
    table.string('dimensions')
    table.string('notes');
    table.integer('views').notNullable().defaultTo(0);
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('posts');
};
