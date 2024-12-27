'use strict';
// SEEDS DUMMY USER DATA

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const SALT_ROUNDS = 5;
    const names = [
      { firstName: "John", lastName: "Doe" },
      { firstName: "Jane", lastName: "Smith" },
      { firstName: "Michael", lastName: "Johnson" },
      { firstName: "Emily", lastName: "Davis" },
      { firstName: "Chris", lastName: "Brown" },
      { firstName: "Amanda", lastName: "Taylor" },
      { firstName: "James", lastName: "Miller" },
      { firstName: "Sarah", lastName: "Wilson" },
      { firstName: "David", lastName: "Anderson" },
      { firstName: "Laura", lastName: "Martin" },
      { firstName: "Daniel", lastName: "Thomas" },
      { firstName: "Sophia", lastName: "Moore" },
      { firstName: "Matthew", lastName: "Jackson" },
      { firstName: "Olivia", lastName: "White" },
      { firstName: "Andrew", lastName: "Harris" },
      { firstName: "Mia", lastName: "Clark" },
      { firstName: "Joshua", lastName: "Lewis" },
      { firstName: "Ella", lastName: "Robinson" },
      { firstName: "Anthony", lastName: "Walker" },
      { firstName: "Liam", lastName: "Hall" },
      { firstName: "Isabella", lastName: "Allen" },
      { firstName: "Tyler", lastName: "Young" },
      { firstName: "Abigail", lastName: "King" },
      { firstName: "Ryan", lastName: "Wright" },
      { firstName: "Grace", lastName: "Scott" },
      { firstName: "Brandon", lastName: "Green" },
      { firstName: "Chloe", lastName: "Adams" },
      { firstName: "Samuel", lastName: "Baker" },
      { firstName: "Hannah", lastName: "Gonzalez" },
      { firstName: "Nicholas", lastName: "Nelson" },
      { firstName: "Natalie", lastName: "Carter" },
      { firstName: "Alex", lastName: "Mitchell" },
      { firstName: "Lily", lastName: "Perez" },
      { firstName: "Benjamin", lastName: "Roberts" },
      { firstName: "Zoe", lastName: "Turner" },
      { firstName: "Jacob", lastName: "Phillips" },
      { firstName: "Samantha", lastName: "Campbell" },
      { firstName: "Ethan", lastName: "Parker" },
      { firstName: "Ava", lastName: "Evans" },
      { firstName: "Dylan", lastName: "Edwards" },
      { firstName: "Victoria", lastName: "Collins" },
      { firstName: "Adam", lastName: "Stewart" },
      { firstName: "Megan", lastName: "Sanchez" },
      { firstName: "Aaron", lastName: "Morris" },
      { firstName: "Isla", lastName: "Rogers" },
      { firstName: "Nathan", lastName: "Reed" },
      { firstName: "Brooke", lastName: "Cook" },
      { firstName: "Sean", lastName: "Morgan" },
      { firstName: "Katie", lastName: "Bell" },
      { firstName: "Kevin", lastName: "Murphy" },
    ];
    const users = [];
    for (let i = 0; i < names.length; i++) {
      const user = {
        firstName: names[i].firstName,
        lastName: names[i].lastName,
        username: `username${i}`,
        email: `email${i}@website.com`,
        hash: await bcrypt.hash(`Password${i}!`, SALT_ROUNDS)
      };
      users.push(user)
    };
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};