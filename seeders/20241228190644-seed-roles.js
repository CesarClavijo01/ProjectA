'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
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
    const [user1, user2] = users;

    await queryInterface.bulkInsert("UserRoles", [
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
        roleId: roles[0].id
      }
    ]);

    await queryInterface.bulkInsert("RoleHierarchies", [
      {
        parentId: roles[1].id,
        childId: roles[0].id
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
