// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');

const { requireAuth, forbid } = require('../../utils/auth.js');
const { appendToSpots, findAvg } = require('../../utils/editSpotsArr');

const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');



const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }, 
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    const Reviews = [];

    for (let review of reviews) {
        const Review = review.toJSON();
        
        const url = await SpotImage.findOne({
            where: {
                preview: true
            }
        });

        Review.Spot.previewImage = url ? url.url : null;

        Reviews.push(Review);
    }

    res.json({Reviews});
});

module.exports = router;