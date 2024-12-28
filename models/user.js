'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: "userId",
        as: "roles"
      })
    };

  };

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
    defaultScope: { attributes: { exclude: ['hash', 'email'] } },
    scopes: {
      id: {
        attributes: ['id']
      },
      attach: {
        attributes: { exclude: ['hash'] }
      },
      login: {},
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