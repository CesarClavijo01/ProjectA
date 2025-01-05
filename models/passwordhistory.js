'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PasswordHistory.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE' // Optional: Delete password history records if user is deleted
      });
    }
  }
  PasswordHistory.init({
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id"
      }
    },
    hash: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'PasswordHistory',
  });
  return PasswordHistory;
};