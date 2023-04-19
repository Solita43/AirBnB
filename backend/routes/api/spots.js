// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');

const { requireAuth, forbid } = require('../../utils/auth.js');
const { appendToSpots, findAvg } = require('../../utils/editSpotsArr');

const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');



const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Country is required.'),
    check('lat')
        .exists({ checkFalsey: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsey: true })
        .isLength({ min: 1, max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsey: true })
        .isLength({ min: 1 })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsey: true })
        .isLength({ min: 1 })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsey: true })
        .isLength({ min: 1 })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsey: true })
        .isInt({min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// Err for spot doesn't exist
const err = new Error("Spot couldn't be found");
err.status = 404;


router.get('/current', requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    });

    const Spots = await appendToSpots(spots);


    res.json({ Spots })
});

router.get('/', async (req, res, next) => {
    const spotsArr = await Spot.findAll();

    const Spots = await appendToSpots(spotsArr);

    res.json({
        Spots
    });
});

router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const user = req.user;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await user.createSpot({ address, city, state, country, lat, lng, name, description, price });

    res.status(201);
    res.json(newSpot);
});

router.post('/:spotId/images', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return next(err);
    }

    if (req.user.id !== spot.ownerId) {
        return next(forbid);
    }


    const { url, preview } = req.body

    const newImage = await spot.createSpotImage({ url, preview });

    return res.json(newImage);
});

router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return next(err);
    }

    const Reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    res.json({
        Reviews
    })
});

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return next(err);
    }

    const isReviewed = await Review.findOne({
        where: {
            [Op.and]: [{spotId: req.params.spotId}, {userId: req.user.id}]
        }
    });

    if (isReviewed) {
        const err = new Error('User already has a review for this spot');
        err.status = 500;
        return next(err);
    }

    const { review, stars } = req.body

    const newReview = await spot.createReview({
        userId: req.user.id,
        review,
        stars
    });

    res.status(201);
    res.json(newReview);
});

router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        // const err = new Error("Spot couldn't be found");
        // err.status = 404;
        return next(err);
    }

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
});

router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return next(err);
    }

    if (req.user.id !== spot.ownerId) {
        return next(forbid);
    }


    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();

    res.json(spot);
});

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return next(err);
    }

    if (req.user.id !== spot.ownerId) {
        return next(forbid);
    }

    await spot.destroy();
    res.json({
        message: 'Successfully deleted'
    });
});




module.exports = router;