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
   options.tableName = 'ReviewImages';
   await queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'https://images-prd.bexrealty.com/Nevada/Las-Vegas/11492-Opal-Springs-Way/2487546-240-single-family-home-92.lg.jpg'
    },
    {
      reviewId: 2,
      url: 'https://www.hauteresidence.com/wp-content/uploads/2017/08/34.jpg'
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
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: ['https://images-prd.bexrealty.com/Nevada/Las-Vegas/11492-Opal-Springs-Way/2487546-240-single-family-home-92.lg.jpg', 'https://www.hauteresidence.com/wp-content/uploads/2017/08/34.jpg']
      }
    }, {});
  }
};
