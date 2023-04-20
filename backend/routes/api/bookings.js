const express = require('express');
const { Op } = require('sequelize');

const { requireAuth, forbid } = require('../../utils/auth.js');
const { appendToSpots, findAvg } = require('../../utils/editSpotsArr');

const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');



const { check } = require('express-validator');
const { handleValidationErrors, validateReview, validateReviewEdits } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        }
    });

    const Bookings = [];

    for (let booking of bookings) {
        const obj = booking.toJSON();

        const spot = await booking.getSpot({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'description']
            }
        });

        const url = await spot.getSpotImages({
            where: {
                preview: true
            }
        }); 

        const Spot = spot.toJSON();

        Spot.previewImage = url ? url[0].dataValues.url: null;

        obj.Spot = Spot;


        Bookings.push(obj)
    }




    res.json({
        Bookings
    })
});

module.exports = router;