const { Sequelize } = require("sequelize");

// const { Sequelize } = require("../models");
const { DB_USERNAME, DB_HOSTNAME, DB_NAME, DB_PASSWORD, DB_DIALECT } =
  process.env;
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
    
});

module.exports = sequelize
