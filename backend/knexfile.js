require("dotenv").config(); // Load environment variables from .env

module.exports = {
  development: {
    client: "pg", // Use PostgreSQL client
    connection: process.env.DATABASE_URL, // Read connection string from .env
    migrations: {
      directory: "./migrations", // Directory where migrations will be stored
    },
    pool: {
      min: 2,
      max: 10, // Optional: Configure connection pool
    },
  },

  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL, // Reuse .env for staging
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL, // Reuse .env for production
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
