exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id").primary(); // Auto-incrementing primary key
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // Foreign key to users
    table
      .integer("photo_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("photos")
      .onDelete("CASCADE"); // Foreign key to photos
    table.text("text").notNullable(); // Comment text
    table.timestamps(true, true); // Created_at and updated_at timestamps
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
