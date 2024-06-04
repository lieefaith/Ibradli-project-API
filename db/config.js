const { Sequelize } = require("sequelize");

// const { Sequelize } = require("../models");
const { DB_USERNAME, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  logging: false,
  port: DB_PORT || 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize
