const mysql = require("mysql2/promise");
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const db = {};

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  }
);
db.sequelize = sequelize;
db.users = require("./user")(sequelize, DataTypes);
// db.models = {};
db.notes = require("./notes")(sequelize, DataTypes);
db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done");
});

module.exports = db;
