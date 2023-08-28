// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    productName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      isDecimal: true,
      type: DataTypes.DECIMAL
    },
    stock: {
      allowNull: false,
      isInteger: true,
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
