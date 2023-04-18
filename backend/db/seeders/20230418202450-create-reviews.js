'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'Reviews';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 1,
      review: 'The place was beautiful and clean. I truly enjoyed my stay',
      stars: 5
    },
    {
      spotId: 1,
      userId: 2,
      review: 'All you can eat ice cream in a gorgeous home? Absolute Perfection.',
      stars: 5
    },
    {
      spotId: 3,
      userId: 2,
      review: 'Gorgeous home, so close to the beach. Had an amazing stay!',
      stars: 5
    },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      review: {
        [Op.in]: ['The place was beautiful and clean. I truly enjoyed my stay', 'All you can eat ice cream in a gorgeous home? Absolute Perfection.', 'Gorgeous home, so close to the beach. Had an amazing stay!']
      }
    }, {});
  }
};
