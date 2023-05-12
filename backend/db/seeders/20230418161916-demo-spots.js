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
    },
    {
      ownerId: 1,
      address: '1298 Maple Street',
      city: 'Denver',
      state: 'CO',
      country: 'United States',
      name: 'The Hidden Gem',
      description: 'Stay in this quaint and cozy cottage with a beautiful garden and outdoor dining area. Perfect for a romantic getaway or solo retreat.',
      price: 130
    },
    {
      ownerId: 1,
      address: '443 Oak Drive',
      city: 'Palm Springs',
      state: 'CA',
      country: 'United States',
      name: 'Bluebell Inn',
      description: "Experience luxury living. With top-of-the-line amenities and sweeping views of the city, you'll feel right at home",
      price: 285
    },
    {
      ownerId: 4,
      address: '723 Chestnut Avenue',
      city: 'Chicago',
      state: 'IL',
      country: 'United States',
      name: 'Home Away From Home',
      description: 'Stay in this beautifully renovated historic home and experience the elegance of another era with all the modern amenities you need for a comfortable stay.',
      price: 145
    },
    {
      ownerId: 1,
      address: '14927 Redwood Drive',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      name: 'Tranquil Haven',
      description: 'Experience the best of both worlds in this modern and stylish apartment with a private rooftop terrace overlooking the city skyline.',
      price: 320
    },
    {
      ownerId: 1,
      address: '10231 Poplar Street',
      city: 'Phoenix',
      state: 'AZ',
      country: 'United States',
      name: 'Sweet Dreams Inn',
      description: 'This charming and historic bed and breakfast offers a cozy and intimate experience with personalized attention and delicious home-cooked breakfasts.',
      price: 180
    },
    {
      ownerId: 1,
      address: '601 Elm Lane',
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      name: 'Serenity House',
      description: 'This luxurious penthouse apartment boasts incredible views of the city and top-of-the-line amenities, including a private hot tub and gourmet kitchen.',
      price: 265
    },
    {
      ownerId: 1,
      address: '16562 Spruce Circle',
      city: 'Big Bear',
      state: 'CA',
      country: 'United States',
      name: 'The Enchanted Cottage',
      description: 'Escape to the mountains and stay in this charming log cabin with rustic furnishings and stunning views of the surrounding wilderness.',
      price: 145
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
