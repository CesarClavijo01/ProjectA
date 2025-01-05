'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminAction extends Model {
    static associate(models) {
      AdminAction.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }
  AdminAction.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    adminId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    action: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'AdminAction',
    timestamps: false
  });
  return AdminAction;
};