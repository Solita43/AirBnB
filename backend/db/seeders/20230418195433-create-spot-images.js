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
   options.tableName = 'SpotImages';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'https://images-prd.bexrealty.com/Nevada/Las-Vegas/11492-Opal-Springs-Way/2487546-240-single-family-home-1.lg.jpg'
    },
    {
      spotId: 1,
      url: 'https://images-prd.bexrealty.com/Nevada/Las-Vegas/11492-Opal-Springs-Way/2487546-240-single-family-home-20.lg.jpg'
    },
    {
      spotId: 1,
      url: 'https://images-prd.bexrealty.com/Nevada/Las-Vegas/11492-Opal-Springs-Way/2487546-240-single-family-home-49.lg.jpg'
    },
    {
      spotId: 1,
      url: 'https://images-prd.bexrealty.com/Nevada/Las-Vegas/11492-Opal-Springs-Way/2487546-240-single-family-home-65.lg.jpg'
    },
    {
      spotId: 3,
      url: 'http://www.hauteresidence.com/wp-content/uploads/2017/08/5.jpg'
    },
    {
      spotId: 2,
      url: 'https://luxury-houses.net/wp-content/uploads/2020/10/Magnificent-8.995-Million-Hollywood-Hills-Home-for-Sale-in-Los-Angeles-11-1024x682.jpg'
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: ['https://images-prd.bexrealty.com/Nevada/Las-Vegas/11492-Opal-Springs-Way/2487546-240-single-family-home-1.lg.jpg', 'https://images-prd.bexrealty.com/Nevada/Las-Vegas/11492-Opal-Springs-Way/2487546-240-single-family-home-20.lg.jpg', 'https://images-prd.bexrealty.com/Nevada/Las-Vegas/11492-Opal-Springs-Way/2487546-240-single-family-home-49.lg.jpg', 'https://images-prd.bexrealty.com/Nevada/Las-Vegas/11492-Opal-Springs-Way/2487546-240-single-family-home-65.lg.jpg', 'http://www.hauteresidence.com/wp-content/uploads/2017/08/5.jpg', 'https://luxury-houses.net/wp-content/uploads/2020/10/Magnificent-8.995-Million-Hollywood-Hills-Home-for-Sale-in-Los-Angeles-11-1024x682.jpg']
      }
    }, {});
  }
};
