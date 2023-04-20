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
        .isInt({min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

const validateReviewEdits = (req, _res, next) => {
    const {review, stars} = req.body;
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


module.exports = {
    handleValidationErrors, validateReview, validateReviewEdits
};