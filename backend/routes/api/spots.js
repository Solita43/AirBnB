// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');

const { requireAuth, forbid } = require('../../utils/auth.js');
const { appendToSpots} = require('../../utils/editSpotsArr');

const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');



const { check } = require('express-validator');
const { handleValidationErrors, validateReview, validateSpotEdits, validateBooking, conflict } = require('../../utils/validation');
const {validateQueries, createPaginationObjectMiddleware, createWhereObject} = require('../../utils/searchValidation.js');

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

// Err for spot doesn't exist
const err = new Error("Spot couldn't be found");
err.status = 404;


router.get('/current', requireAuth, async (req, res, _next) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    });

    const Spots = await appendToSpots(spots);


    res.json({ Spots })
});

router.get('/', validateQueries, createPaginationObjectMiddleware(), createWhereObject,  async (req, res, _next) => {
    const spotsArr = await Spot.findAll({
        where: req.where,
        ...req.pagination
    });

    const Spots = await appendToSpots(spotsArr);
    
    const size = await Spot.count({
        where: req.where
    });

    res.json({
        Spots,
        page: req.page,
        size
    });
});

router.post('/', requireAuth, validateSpot, async (req, res, _next) => {
    const user = req.user;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await user.createSpot({ address, city, state, country, lat, lng, name, description, price });

    res.status(201);
    res.json(newSpot);
});

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return next(err);
    }

    if (req.user.id !== spot.ownerId) {
        return next(forbid);
    }


    const { url, preview } = req.body

    const newImage = await spot.createSpotImage({ url, preview });

    const response = newImage.toJSON();
    
    delete response.spotId;
    delete response.createdAt;
    delete response.updatedAt;

    return res.json(response);
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
            [Op.and]: [{ spotId: req.params.spotId }, { userId: req.user.id }]
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

router.get('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return next(err);
    }

    if (req.user.id !== spot.ownerId) {
        const Bookings = await spot.getBookings({
            attributes: ['spotId', 'startDate', 'endDate']
        });

        return res.json( {
            Bookings
        });
    } else {
        const Bookings = await spot.getBookings({
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        });

        return res.json({
            Bookings
        });
    }
});

router.post('/:spotId/bookings', requireAuth, validateBooking, async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return next(err);
    }

    if (req.user.id === spot.ownerId) {
        return next(forbid);
    } 
  
    const {startDate, endDate} = req.body

    // const now = Date.now();

    // const start = new Date(startDate.split('-').join('.')).getTime();

    // if (now > start) {
    //     const err = new Error("Bookings cannot be made for past dates");
    //     err.status = 403;
    //     return next(err);
    // }

    const error = await conflict(spot, startDate, endDate);

    if (error !== 'pass') return next(error);
    else {
        const booking = await spot.createBooking({ userId: req.user.id, startDate, endDate });
        return res.json(booking);
    }
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

router.put('/:spotId', requireAuth, validateSpotEdits, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return next(err);
    }

    if (req.user.id !== spot.ownerId) {
        return next(forbid);
    }


    if (address) spot.address = address;
    if (city) spot.city = city;
    if (state) spot.state = state;
    if (country) spot.country = country;
    if (lat) spot.lat = lat;
    if (lng) spot.lng = lng;
    if (name) spot.name = name;
    if (description) spot.description = description;
    if (price) spot.price = price;

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