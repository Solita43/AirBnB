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
   options.tableName = 'Spots';
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 2,
      address: '521 Presley Ln',
      city: 'Las Vegas',
      state: 'NV',
      country: 'United States',
      name: 'Heartbreak Hotel',
      description: 'Come mend your broken heart. We offer bottemless ice cream and parties so wild you will forget you had a broken heart to begin with!',
      price: 380
    },
    {
      ownerId: 1,
      address: '1343 Ajijic Ave',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      name: 'Luxury Getaway',
      description: 'Take a break, relax, and enjoy the city!',
      price: 675
    },
    {
      ownerId: 2,
      address: '859 E Walnut Ave',
      city: 'San Diego',
      state: 'CA',
      country: 'United States',
      name: 'Fun in the Sun',
      description: 'Leave your cares behind and enjoy a stay in this cozy getaway right near the beach!',
      price: 210
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      address: {
        [Op.in]: ['521 Presley Ln', '1343 Ajijic Ave', '859 E Walnut Ave']
      }
    }, {});
  }
};
