'use strict';
const {
  Model
} = require('sequelize');
const { passwordHash } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Message, { foreignKey: `UserId` })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "username has already been taken"
      },
      validate: {
        notEmpty: {
          msg: "username is required"
        },
        notEmpty: {
          msg: "username is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password is required"
        },
        notEmpty: {
          msg: "password is required"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      default: "https://imgs.search.brave.com/k4VXX9uyVPedOonGsxXKJoG9Z3e9Rsoh_bSdjK-VRuk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTEy/NTM2MTY1L3Bob3Rv/L2NvcmdpLXB1cHB5/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1NWGFYX2ZHbDR5/SEYzaHc5d0dvc3Bi/dWdxVnh4N3R0cEJf/QkFkSnJEbkhNPQ"
    }

  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(el => {
    el.password = passwordHash(el.password)
  })
  return User;
};