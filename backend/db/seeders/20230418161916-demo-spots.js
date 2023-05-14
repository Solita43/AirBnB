'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
        ownerId: 5,
        address: '2324 Lily Lane',
        city: 'San Francisco',
        state: 'CA',
        country: 'United States',
        name: 'Urban Oasis Loft',
        description: "Welcome to our stunning 2-bedroom apartment in the heart of San Francisco's vibrant Mission District.Our spacious and modern apartment is the perfect home base for exploring everything that this eclectic neighborhood has to offer.With its open floor plan, gourmet kitchen, and stunning views of the city skyline, our apartment is the ultimate retreat for those seeking comfort and luxury in the heart of San Francisco. Located just steps away from some of the city's best restaurants, cafes, and shops, our apartment offers easy access to the cultural and culinary delights of the Mission District. Spend your days exploring the colorful murals that line the streets, sampling delicious Mexican food at one of the neighborhood's many taquerias, or browsing the unique boutiques and vintage shops that dot the area. After a day of exploring, come back to our cozy apartment and relax in the comfort of our stylish living room, complete with a flat- screen TV and comfortable seating.Our gourmet kitchen is fully equipped with top - of - the - line appliances and everything you need to whip up a delicious meal, and our spacious dining area offers plenty of room to enjoy your culinary creations. Both of our spacious bedrooms offer plush bedding and plenty of storage space, ensuring a restful night's sleep. And with its stunning views of the city skyline, our apartment offers a truly unforgettable San Francisco experience. Whether you're in town for business or pleasure, our Mission District apartment is the perfect place to call home during your stay in San Francisco. We look forward to welcoming you!",
        price: 265.00
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
      },
      {
        ownerId: 1,
        address: '1920 Rose Street',
        city: 'Denver',
        state: 'CO',
        country: 'United States',
        name: 'Sunset Vista',
        description: 'Welcome to our stunning and spacious 3-bedroom villa, nestled in the heart of the lush tropical rainforest. Surrounded by towering trees and the sounds of birds and monkeys, our home is the perfect oasis for nature lovers and those seeking tranquility. Relax in our luxurious outdoor pool, explore nearby waterfalls and hiking trails, or simply unwind on our expansive deck and soak up the breathtaking views!',
        price: 349.85
      },
      {
        ownerId: 1,
        address: '2021 Laurel Lane',
        city: 'Madison',
        state: 'WI',
        country: 'United States',
        name: "River's Edge Retreat",
        description: 'Come stay in our charming and cozy 1-bedroom cottage, situated on a working farm in the rolling hills of Tuscany. With its rustic charm and modern amenities, our cottage is the perfect place to escape the hustle and bustle of city life. Wake up to the sounds of roosters and the smell of fresh bread baking, and spend your days exploring the vineyards and olive groves of this picturesque region.',
        price: 95.00
      },
      {
        ownerId: 1,
        address: '2122 Ivy Court',
        city: 'Denver',
        state: 'CO',
        country: 'United States',
        name: 'Cozy Cabin Haven',
        description: 'Our cozy and charming 2-bedroom cottage, offers the perfect blend of traditional Scottish hospitality and modern comfort. With its roaring fireplace, and stunning views, our cottage is the perfect place to experience the rich history and culture of Scotland.',
        price: 105.00
      },
      {
        ownerId: 5,
        address: '2223 Daisy Drive',
        city: 'Portland',
        state: 'ME',
        country: 'United States',
        name: 'Tranquil Oasis',
        description: 'Looking for a unique and unforgettable vacation experience? Our treehouse bungalow, perched high in the canopy of a tropical rainforest, is the perfect choice. With its rustic charm, stunning views, and eco-friendly design, our bungalow offers a one-of-a-kind opportunity to reconnect with nature and escape the stresses of everyday life.',
        price: 159.00
      },
      
    ], {});
  },

  async down(queryInterface, Sequelize) {
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
