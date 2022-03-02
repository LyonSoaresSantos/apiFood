/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.double('price').notNullable();
        table.integer('status').notNullable();
        table.integer('promotion').notNullable();
        table.double('oldprice').notNullable();
        table.integer('restaurantid').notNullable();
        table.integer('categoryid').notNullable();
        table.string('imagepath');
        table.timestamps(true, true);
      });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('products');
  
};
