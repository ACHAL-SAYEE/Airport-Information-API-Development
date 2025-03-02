const { DataSource } = require("typeorm");
const { User } = require("./models/airport");

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "airport.db",
  entities: [User],
  synchronize: true, // Auto-create tables in development
  logging: true,
});

module.exports = { AppDataSource };
