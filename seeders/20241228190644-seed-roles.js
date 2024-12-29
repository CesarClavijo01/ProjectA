'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: "User",
        description: "Base role"
      },
      {
        name: "Mod",
        description: "Moderates website content"
      },
      {
        name: "Admin",
        description: "Full permissions"
      },
    ], {})
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const [user1, user2, ...rest] = users;

    const baseRoleAssignments = rest.map(user => ({
      userId: user.id,
      roleId: 1
    }));

    await queryInterface.bulkInsert("UserRoles", [
      {
        userId: user1.id,
        roleId: 3
      },
      {
        userId: user1.id,
        roleId: 2
      },
      {
        userId: user1.id,
        roleId: 1
      },
      {
        userId: user2.id,
        roleId: 2
      },
      {
        userId: user2.id,
        roleId: 1
      },
      ...baseRoleAssignments
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
