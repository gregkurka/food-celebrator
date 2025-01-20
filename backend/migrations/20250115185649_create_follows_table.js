exports.up = function (knex) {
  return knex.schema.createTable("follows", function (table) {
    table.increments("id").primary(); // Auto-incrementing primary key
    table
      .integer("follower_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // Foreign key to users (the follower)
    table
      .integer("followed_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // Foreign key to users (the followed user)
    table.timestamps(true, true); // Created_at and updated_at timestamps
    table.unique(["follower_id", "followed_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("follows");
};
