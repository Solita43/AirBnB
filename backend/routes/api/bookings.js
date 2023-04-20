const express = require('express');
const { Op } = require('sequelize');

const { requireAuth, forbid } = require('../../utils/auth.js');
const { appendToSpots, findAvg } = require('../../utils/editSpotsArr');

const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');



const { check } = require('express-validator');
const { handleValidationErrors, validateReview, validateReviewEdits, validateBooking, conflict } = require('../../utils/validation');

const router = express.Router();

const err = new Error("Booking couldn't be found");
err.status = 404;

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
        if (url) console.log(url)
        Spot.previewImage = url.length ? url[0].dataValues.url : null;


        obj.Spot = Spot;


        Bookings.push(obj)
    }




    res.json({
        Bookings
    })
});

router.put('/:bookingId', requireAuth, validateBooking, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);

    const spot = await Spot.findByPk(booking.spotId);

    if (!booking) {
        return next(err);
    }

    if (req.user.id !== booking.userId) {
        return next(forbid);
    }
    const { startDate, endDate } = req.body

    const now = Date.now();

    const end = new Date(booking.endDate.split('-').join('.')).getTime();

    if (now > end) {
        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        return next(err);
    }


    const err = await conflict(spot, startDate, endDate);

    if (err !== 'pass') return next(err);
    else {
        booking.startDate = startDate;
        booking.endDate = endDate;
        await booking.save();

        return res.json(booking);
    }
});

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        return next(err);
    }

    if (req.user.id !== booking.userId) {
        return next(forbid);
    }
    
    const now = Date.now();

    const start = new Date(booking.startDate.split('-').join('.')).getTime();

    if (now >= start) {
        const err = new Error("Bookings that have been started can't be deleted");
        err.status = 403;
        return next(err);
    }

    await booking.destroy();
    return res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;