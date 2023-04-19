'use strict';

/** @type {import('sequelize-cli').Migration} */

const options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const bookings =  [
  {
    spotId: 1,
    userId: 2,
    startDate: '2023-10-15',
    endDate: '2023-10-20'
  },
  {
    spotId: 2,
    userId: 1,
    startDate: '2023-11-25',
    endDate: '2023-11-27'
  },
  {
    spotId: 1,
    userId: 3,
    startDate: '2023-12-25',
    endDate: '2023-12-31'
  },
  {
    spotId: 3,
    userId: 1,
    startDate: '2023-12-24',
    endDate: '2023-12-28'
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, bookings, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
