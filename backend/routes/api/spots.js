// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');

const {requireAuth } = require('../../utils/auth.js');
const {appendToSpots, findAvg } = require('../../utils/editSpotsArr');

const { User, Spot, Review, SpotImage } = require('../../db/models');



const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();





router.get('/current', requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    });

    const Spots = await appendToSpots(spots);


    res.json({Spots})
});

router.get('/', async (req, res, next) => {
    const spotsArr = await Spot.findAll();

   const Spots = await appendToSpots(spotsArr);

    res.json({
        Spots
    });
});


router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        // include: [
        //     {
        //         model: SpotImage,
        //         attributes: {
        //             exclude: ['createdAt', 'updatedAt']
        //         }
        //     },
        //     {
        //         model: User,
        //         attributes: ['id']
        //     }
        // ]
    });

    const spotObj = await spot.toJSON();

    const sum = await Review.sum('stars', {
        where: {
            spotId: req.params.spotId
        }
    });

    const count = await Review.count({
        where: {
            spotId: req.params.spotId
        }
    });

    spotObj.numReviews = count;
    spotObj.avgStarRating = sum / count;

    spotObj.SpotImages = await SpotImage.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: {
            exclude: ['spotId', 'createdAt', 'updatedAt']
        }
    });

    spotObj.Owner = await User.scope('defaultScope').findByPk(spotObj.ownerId, {
        attributes: {
            exclude: ['username']
        }
    });


    res.json(spotObj)
})





module.exports = router;