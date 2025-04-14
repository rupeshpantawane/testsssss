'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emp extends Model {
    static associate(models) {
    }
  }
  Emp.init({
    first_name: {
      type: DataTypes.STRING
    },
    stock: {
      type: DataTypes.INTEGER
    },
    sold: {
      type: DataTypes.INTEGER
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },  
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tp1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },          
  }, {
    sequelize,
    modelName: 'Emp',
    tableName: 'emps',
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
  });
  return Emp;
};