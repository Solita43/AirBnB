const express = require('express');
const { Op } = require('sequelize');

const { requireAuth, forbid } = require('../../utils/auth.js');
const { appendToSpots, findAvg } = require('../../utils/editSpotsArr');

const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');



const { check } = require('express-validator');
const { handleValidationErrors, validateReview, validateReviewEdits, validateBooking, conflict } = require('../../utils/validation');

const router = express.Router();

const err = new Error("Spot Image couldn't be found");
err.status = 404;

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const image = await SpotImage.findByPk(req.params.imageId);
    
    if (!image) {
        return next(err);
    }
    
    const spot = await Spot.findByPk(image.spotId)


    if (req.user.id !== spot.ownerId) {
        return next(forbid);
    }

    await image.destroy();

    res.json({
        message: "Successfully deleted"
    })
});

module.exports = router;
