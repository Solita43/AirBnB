'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spot1 = ['https://images-prd.bexrealty.com/Nevada/Las-Vegas/11492-Opal-Springs-Way/2487546-240-single-family-home-1.lg.jpg',
  "https://images.unsplash.com/photo-1617326021886-53d6be1d7154?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw4NTU5NzYxfHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1613807871118-9e983601b759?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXw4NTU5NzYxfHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1609347775269-5992fb107919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHw4NTU5NzYxfHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1609348451466-394d66e6f4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8ODU1OTc2MXx8ZW58MHx8fHw%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1587048595115-553751fdc150?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8ODU1OTc2MXx8ZW58MHx8fHw%3D&w=1000&q=80"]

const spot2 = ['https://luxury-houses.net/wp-content/uploads/2020/10/Magnificent-8.995-Million-Hollywood-Hills-Home-for-Sale-in-Los-Angeles-11-1024x682.jpg',
  "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTV8ODU1OTc2MXx8ZW58MHx8fHw%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1532204182725-d0f67855ac87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTl8ODU1OTc2MXx8ZW58MHx8fHw%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1523920020520-bc3e5db128b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjJ8ODU1OTc2MXx8ZW58MHx8fHw%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1551380701-5dd33d5b5d06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjV8ODU1OTc2MXx8ZW58MHx8fHw%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1572048793162-8a36a83f1def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjh8ODU1OTc2MXx8ZW58MHx8fHw%3D&w=1000&q=80"]


const spot3 = ['http://www.hauteresidence.com/wp-content/uploads/2017/08/5.jpg',
  "https://images.unsplash.com/photo-1562175976-46d190663475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzF8ODU1OTc2MXx8ZW58MHx8fHw%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzR8ODU1OTc2MXx8ZW58MHx8fHw%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1600421719060-f18eba3cba4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mzd8ODU1OTc2MXx8ZW58MHx8fHw%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1531410691118-74e9fbc0f57f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDB8ODU1OTc2MXx8ZW58MHx8fHw%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDF8ODU1OTc2MXx8ZW58MHx8fHw%3D&w=1000&q=80"]




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
    options.tableName = 'SpotImages';

    const images = [];

    const createImgObj = (spotId, url, preview) => {
      return {
        spotId,
        url,
        preview
      }
    }

    spot1.forEach((el, idx) => {
      const preview = idx === 0 ? true : false;
      images.push(createImgObj(1, el, preview))
    });

    spot2.forEach((el, idx) => {
      const preview = idx === 0 ? true : false;
      images.push(createImgObj(2, el, preview))
    });

    spot3.forEach((el, idx) => {
      const preview = idx === 0 ? true : false;
      images.push(createImgObj(3, el, preview))
    });




    await queryInterface.bulkInsert(options, images, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
