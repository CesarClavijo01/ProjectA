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
    const roles = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles";`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const [user1, user2, ...rest] = users;

    const baseRoleAssignments = rest.map(user => ({
      userId: user.id,
      roleId: roles[0].id
    }));

    await queryInterface.bulkInsert("UserRoles", [
      {
        userId: user1.id,
        roleId: roles[2].id
      },
      {
        userId: user1.id,
        roleId: roles[1].id
      },
      {
        userId: user1.id,
        roleId: roles[0].id
      },
      {
        userId: user2.id,
        roleId: roles[1].id
      },
      {
        userId: user2.id,
        roleId: roles[0].id
      },
      ...baseRoleAssignments
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
