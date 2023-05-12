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

const spot4 = ['https://images.unsplash.com/photo-1575403071235-5dcd06cbf169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdHRhZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1563714193017-5a5fb60bc02b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNvdHRhZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1663811397236-731fb210c817?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTl8MjQwMzU1OHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1656030683049-506940046bd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjJ8MjQwMzU1OHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mzd8MjQwMzU1OHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60']

const spot5 = ['https://a0.muscache.com/im/pictures/ba358fed-66ce-404c-bb70-b79729f86df4.jpg',
  'https://a0.muscache.com/im/pictures/519e9fa5-1733-4102-b08e-60f7dd9fa893.jpg',
  'https://a0.muscache.com/im/pictures/4374308d-1213-4e5c-aff8-d0404bc1ea29.jpg',
  'https://a0.muscache.com/im/pictures/98fa9865-54ec-4d45-8150-cca306a36946.jpg',
  'https://a0.muscache.com/im/pictures/fb9e65cd-4e10-4694-9c51-4911db6e19ce.jpg']

const spot6 = ['https://a0.muscache.com/im/pictures/miso/Hosting-34816258/original/2d7809ce-da38-4c1f-a225-097229c56561.jpeg',
  'https://a0.muscache.com/im/pictures/0d8d45ef-69d4-42d8-864a-b6b5eb14a83c.jpg',
  'https://a0.muscache.com/im/pictures/a47a4e8c-0cc5-4b50-bcc0-8633d2d63f3a.jpg',
  'https://a0.muscache.com/im/pictures/e99a001f-1b3d-4bc4-9071-ef2395343cd8.jpg',
  'https://a0.muscache.com/im/pictures/a9c79c51-be80-4bd0-9682-4f9cadcb0887.jpg?im_w=720']

const spot7 = ['https://a0.muscache.com/im/pictures/8cd65997-d77d-40f0-a41c-18ef2559d881.jpg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-46648148/original/40ea8be3-be70-4aaf-878b-76c558ce923f.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-46648148/original/50f1a2e9-e615-434d-8a99-618b0118728e.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-46648148/original/d0b1dfd3-ab93-4aac-8685-bad0af630578.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-46648148/original/8d11f505-5a78-4361-83e4-fd02fa715b6d.jpeg']

const spot8 = ['https://a0.muscache.com/im/pictures/63a21006-5525-4932-88bf-5d5e51d6eb9b.jpg',
  'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/71119c0b-f850-4cbc-aefd-c28f5ce7cc5d.jpeg',
  'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/d3aea3ea-88b3-4400-bd02-b38980f1a083.jpeg',
  'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/ec0a73c7-20d6-44a0-8c0f-589696fef2ee.jpeg',
  'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/90d02e51-4ae0-4eec-a0bc-02b3732357b9.jpeg']

  const spot9 = ['https://a0.muscache.com/im/pictures/460efdcd-1286-431d-b4e5-e316d6427707.jpg',
  'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/784c82b1-45c7-4f47-815d-d19063875a75.jpeg',
  'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/84bb8aca-82e0-4395-acfa-3a5a1218b83b.jpeg',
  'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/2a385fcd-9bdf-40d9-896b-ddd566e0d2b0.jpeg',
  'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/cdd47105-eee6-4f0a-b959-f45fb56400ee.jpeg']

  const spot10 = ['https://a0.muscache.com/im/pictures/miso/Hosting-629781609683997067/original/8b845bcf-aac4-4ae7-b4ea-f924aeb039dd.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-705626260397182020/original/f73d4dc6-65af-4b68-b212-9ce5a8dec785.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-705626260397182020/original/36a5d287-97c6-4b9a-bf90-141c74419f08.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-705626260397182020/original/caded1a5-fc7c-42f7-8555-143ab64d963a.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-705626260397182020/original/8c876fdd-0fc3-4bd5-acd1-9fc9079afcd0.jpeg']


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

    spot4.forEach((el, idx) => {
      const preview = idx === 0 ? true : false;
      images.push(createImgObj(4, el, preview))
    });

    spot5.forEach((el, idx) => {
      const preview = idx === 0 ? true : false;
      images.push(createImgObj(5, el, preview))
    });

    spot6.forEach((el, idx) => {
      const preview = idx === 0 ? true : false;
      images.push(createImgObj(6, el, preview))
    });

    spot7.forEach((el, idx) => {
      const preview = idx === 0 ? true : false;
      images.push(createImgObj(7, el, preview))
    });

    spot8.forEach((el, idx) => {
      const preview = idx === 0 ? true : false;
      images.push(createImgObj(8, el, preview))
    });

    spot9.forEach((el, idx) => {
      const preview = idx === 0 ? true : false;
      images.push(createImgObj(9, el, preview))
    });

    spot10.forEach((el, idx) => {
      const preview = idx === 0 ? true : false;
      images.push(createImgObj(10, el, preview))
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
