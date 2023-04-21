// backend/utils/validation.js
const { validationResult, check } = require('express-validator');
const { ValidationError } = require('sequelize');



// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        console.log(validationErrors);
        validationErrors
            .array()
            .forEach(error => errors[error.path] = error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    }
    next();
};

const validateReview = [
    check('review')
        .exists({ checkFalsey: true })
        .isLength({ min: 1 })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsey: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

const validateReviewEdits = (req, _res, next) => {
    const { review, stars } = req.body;
    const errors = {};

    if (review === "" || review === " ") errors.review = 'Review text is required';

    if (stars > 5 || stars < 1) errors.stars = 'Stars must be an integer from 1 to 5';


    if (errors.review || errors.stars) {
        const err = new Error("Bad Request");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request";
        return next(err);
    }

    next();

}



const validateSpotEdits = (req, _res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const errors = {};

    if (address === "" || address === " ") errors.address = "Street address is required";

    if (city === "" || city === " ") errors.city = "City is required";

    if (state === "" || state === " ") errors.state = "State is required";

    if (country === "" || country === " ") errors.country = "Country is required";

    if (lat > 90 || lat < -90) errors.lat = "Latitude is not valid";

    if (lng > 180 || lng < -180) errors.lng = "Longitude is not valid";

    if (name) {
        if (name.length > 50) errors.name = "Name must be less than 50 characters";
    }

    if (description === "" || description === " ") errors.description = "Description is required";

    if (price === "" || price === " ") errors.price = "Price per day is required";

    if (errors.address || errors.city || errors.state || errors.country || errors.lat || errors.lng || errors.name || errors.description || errors.price) {
        const err = new Error("Bad Request");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request";
        return next(err);
    }

    next();

}

const validateBooking = (req, res, next) => {
    const { startDate, endDate } = req.body;

    let start = new Date(startDate.split('-').join(','));
    let end = new Date(endDate.split('-').join(','));

    console.log(start);
    console.log(end);

    const err = Error("Bad request.");
    err.errors = { endDate: "endDate cannot be on or before startDate" };
    err.status = 400;
    err.title = "Bad request.";

    if (startDate === endDate) next(err);
    else if (end.getTime() < start.getTime()) next(err);
    else next();

}


const conflict = async (spot, startDate, endDate) => {
    const bookings = await spot.getBookings();

    const begin = new Date(startDate.split('-').join(',')).getTime();
    const stop = new Date(endDate.split('-').join('.')).getTime()

    const errors = {};
    for (let booking of bookings) {
        const start = new Date(booking.startDate.split('-').join(',')).getTime();
        const end = new Date(booking.endDate.split('-').join('.')).getTime();

        if (begin >= start && begin < end) errors.startDate = "Start date conflicts with an existing booking";

        if (stop > start && stop <= end) errors.endDate = "End date conflicts with an existing booking";

        if (begin < start && stop > end) errors.endDate = "End date conflicts with an existing booking";

        if (errors.startDate || errors.endDate) {
            const err = new Error("Sorry, this spot is already booked for the specified dates");
            err.errors = errors;
            err.status = 404;
            return err;
        }
    }

    return 'pass';
}




module.exports = {
    handleValidationErrors, validateReview, validateReviewEdits, validateSpotEdits, validateBooking, conflict
};