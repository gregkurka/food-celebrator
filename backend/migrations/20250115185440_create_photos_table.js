exports.up = function (knex) {
  return knex.schema.createTable("photos", function (table) {
    table.increments("id").primary(); // Auto-incrementing primary key
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // Foreign key to users
    table.text("image_url").notNullable(); // URL of the uploaded photo
    table.text("caption"); // Optional caption
    table.timestamps(true, true); // Created_at and updated_at timestamps
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("photos");
};
