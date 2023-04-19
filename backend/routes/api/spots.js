// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');

const { requireAuth, forbid } = require('../../utils/auth.js');
const { appendToSpots, findAvg } = require('../../utils/editSpotsArr');

const { User, Spot, Review, SpotImage } = require('../../db/models');



const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateNewSpot = [
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
    // check('name')
    //     .exists({ checkFalsey: true })
        
    //     .withMessage('Name must be less than 50 characters'),
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

router.post('/', requireAuth, validateNewSpot, async (req, res, next) => {
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

router.put('/:spotId', requireAuth, validateNewSpot, async (req, res, next) => {
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
})





module.exports = router;