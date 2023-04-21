const express = require('express');

const { requireAuth, forbid } = require('../../utils/auth.js');
const { Spot, Booking } = require('../../db/models');
const {  validateBooking, conflict } = require('../../utils/validation');

const router = express.Router();

const err = new Error("Booking couldn't be found");
err.status = 404;

router.get('/current', requireAuth, async (req, res, _next) => {
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
        
        Spot.previewImage = url.length ? url[0].dataValues.url : null;


        obj.Spot = Spot;


        Bookings.push(obj)
    }




    res.json({
        Bookings
    })
});

router.put('/:bookingId', requireAuth, validateBooking, async (req, res, next) => {
    const { startDate, endDate } = req.body

    if (!startDate || !endDate) {
        const e = new Error('Must include both startDate and endDate');
        e.status = 400;
        return next(e);
    }

    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        // const err = new Error("Booking couldn't be found");
        // err.status = 404;
        return next(err);
    }

    const spot = await Spot.findByPk(booking.spotId);


    if (req.user.id !== booking.userId) {
        return next(forbid);
    }

    const now = Date.now();

    const end = new Date(booking.endDate.split('-').join('.')).getTime();

    if (now > end) {
        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        return next(err);
    }


    const error = await conflict(spot, startDate, endDate);

    if (error !== 'pass') return next(error);
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