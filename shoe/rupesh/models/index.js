"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
// const env = "development";
// const env = process.env.NODE_ENV || "production";
// const config = require(__dirname + "/../config/config.json")[env];
const app = require('../services/app.service');
const config = require(__dirname + '/../config/config.json')[app['env']];
const db = {};


var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
sequelize.sync({alter:true, force:false})
// var sequelize = new Sequelize(config.database, 'leitstelle-development', config.password, config);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;

module.exports = db;
