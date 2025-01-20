exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary(); // Auto-incrementing primary key
    table.string("username", 50).notNullable().unique(); // Unique username
    table.string("email", 100).notNullable().unique(); // Unique email
    table.text("password_hash").notNullable(); // Hashed password
    table.timestamps(true, true); // Created_at and updated_at timestamps
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users"); // Drop the table if rolling back
};
