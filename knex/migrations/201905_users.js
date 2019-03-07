exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments().primary().unique().notNullable();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.string('first_name').nullable();
    table.string('last_name').nullable();
    table.string('email').notNullable();
    table.integer('status_id').references('id').inTable('userStatus').defaultTo(2);
    table.timestamps(true, true);
    table.boolean('verified').notNullable().defaultTo(false);
    table.boolean('is_admin').notNullable().defaultTo(false);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
