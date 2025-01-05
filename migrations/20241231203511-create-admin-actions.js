'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AdminActions', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.fn('uuid_generate_v4'),
        type: Sequelize.UUID,
      },
      adminId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      action: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      performedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AdminActions');
  }
};