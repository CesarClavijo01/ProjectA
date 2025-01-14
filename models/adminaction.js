'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminAction extends Model {
    static associate(models) {
      AdminAction.belongsTo(models.User, {
        foreignKey: 'adminId',
        as: 'admin',
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
    details: {
      allowNull: false,
      type: DataTypes.STRING
    },
    performedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'AdminAction',
    timestamps: false
  });
  return AdminAction;
};