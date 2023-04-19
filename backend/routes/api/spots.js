// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');

const { User, Spot, Review, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/', async (req, res, next) => {
    const spotsArr = await Spot.findAll();

    const Spots = [];

    for (let spot of spotsArr) {
        const obj = spot.toJSON();

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


        const url = await SpotImage.findOne({
            where: {
                [Op.and]: [{spotId: obj.id}, {preview: true}]
            },
            attributes: ['url']
        });

        obj.previewImage = url.url


        Spots.push(obj)
    }

    res.json({
        Spots
    });
});







module.exports = router;