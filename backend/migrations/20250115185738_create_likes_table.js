exports.up = function (knex) {
  return knex.schema.createTable("likes", function (table) {
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
    table.timestamps(true, true); // Created_at and updated_at timestamps
    table.unique(["user_id", "photo_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("likes");
};
