'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Upload extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Upload.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'username is required'
        },
        notEmpty: {
          msg: 'username is required'
        }
      }
    },
    chatroom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'chatroom is required'
        },
        notEmpty: {
          msg: 'chatroom is required'
        }
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'message is required'
        },
        notEmpty: {
          msg: 'message is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Upload',
  });
  return Upload;
};