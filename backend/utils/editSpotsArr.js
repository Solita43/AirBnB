const { Review, SpotImage } = require('../db/models');
const { Op } = require('sequelize');



const findAvg = async (obj) => {
    const sum = await Review.sum('stars', {
        where: {
            spotId: obj.id
        }
    });
    
    const count = await Review.count({
        where: {
            spotId: obj.id
        }
    });
    
    obj.avgRating = sum / count;

    return obj
}

const appendToSpots = async (arr) => {
    const Spots = [];

    for (let spot of arr) {
        const obj = spot.toJSON();

        const objAvg = await findAvg(obj);

        const url = await SpotImage.findOne({
            where: {
                [Op.and]: [{ spotId: obj.id }, { preview: true }]
            },
            attributes: ['url']
        });

        obj.previewImage = url ? url.url : null


        Spots.push(obj)
    }

    return Spots

}

module.exports = { appendToSpots, findAvg }
