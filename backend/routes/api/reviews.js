// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');

const { requireAuth, forbid } = require('../../utils/auth.js');
const { appendToSpots, findAvg } = require('../../utils/editSpotsArr');

const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');



const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const err = new Error("Review couldn't be found");
err.status = 404;

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

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        return next(err);
    }

    if (req.user.id !== review.userId) {
        return next(forbid);
    }

    const isMaxed = await ReviewImage.count({
        where: {
            reviewId: req.params.reviewId
        }
    });

    if (isMaxed >= 10) {
        const maxE = new Error("Maximum number of images for this resource was reached");
        maxE.status = 403;
        return next(maxE);
    }

    const { url } = req.body

    const newImage = await review.createReviewImage({ url });

    return res.json({
        id: newImage.id,
        url: newImage.url
    });
});

module.exports = router;