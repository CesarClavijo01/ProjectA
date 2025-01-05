'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleHierarchy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoleHierarchy.init({
    parentId: {
      type: DataTypes.UUID,
      references: {
        model: "Roles",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    },
    childId: {
      type: DataTypes.UUID,
      references: {
        model: "Roles",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    }
  }, {
    sequelize,
    modelName: 'RoleHierarchy',
  });
  return RoleHierarchy;
};