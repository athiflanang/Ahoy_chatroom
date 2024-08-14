'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Message, { foreignKey: `CategoryId` })
    }
  }
  Category.init({
    chatroom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Chatroom is required`
        },
        notNull: {
          msg: `Chatroom is required`
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};