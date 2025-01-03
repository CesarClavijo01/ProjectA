'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
    }

  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: { attributes: ['id', 'firstName', 'lastName', 'username', 'createdAt', 'updatedAt'] },
    scopes: {
      id: {
        attributes: ['id']
      },
      login: {
        attributes: ['id', 'firstName', 'lastName', 'email', 'username', 'hash', 'createdAt', 'updatedAt']
      },
      attach: {
        attributes: ['id', 'firstName', 'lastName', 'email', 'username', 'createdAt', 'updatedAt']
      },
      password: {
        attributes: ['id', 'hash']
      },
      search: {
        attributes: ['id', 'username', 'createdAt']
      }
    }
  });

  return User;
};