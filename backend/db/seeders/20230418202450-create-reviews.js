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
      review: '"This exceeded our expectations! The apartment was modern and well-appointed, and the host went above and beyond to make us feel at home. The location was also fantastic, with easy access to public transportation and attractions. Would definitely stay here again."',
      stars: 5
    },
    {
      spotId: 1,
      userId: 3,
      review: "This place was amazing! The host was friendly and helpful, and the apartment was clean, stylish, and had all the amenities we needed. The location was also fantastic, with easy access to public transportation and nearby attractions. Would definitely stay here again.",
      stars: 5
    },
    {
      spotId: 3,
      userId: 2,
      review: 'Gorgeous home, so close to the beach. Had an amazing stay!',
      stars: 5
    },
    {
      spotId: 1,
      userId: 4,
      review: "I recently stayed here and had an okay experience. The host was friendly and helpful, and the space was decently clean. The location was convenient and close to many attractions. There were a few minor issues, such as some noise from the street and the bed not being as comfortable as I had hoped. Overall, I probably wouldn't stay again",
      stars: 5
    },
    {
      spotId: 1,
      userId: 5,
      review: "We had a mixed experience at this Airbnb. While the host was friendly and accommodating, the space itself was not as clean as we had hoped and there was some noise from outside that disrupted our sleep.",
      stars: 3
    },
    {
      spotId: 10,
      userId: 3,
      review: "This place was amazing! The host was friendly and helpful, and the apartment was clean, stylish, and had all the amenities we needed. The location was also fantastic, with easy access to public transportation and nearby attractions. Would definitely stay here again.",
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
