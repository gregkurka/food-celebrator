const knex = require("knex");
const config = require("./knexfile");

// Initialize Knex using the development configuration
const db = knex(config.development);

module.exports = db; // Export the initialized Knex instance
