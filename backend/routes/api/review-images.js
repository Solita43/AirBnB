const express = require('express');

const { requireAuth, forbid } = require('../../utils/auth.js');
const { Review, ReviewImage } = require('../../db/models');

const router = express.Router();

const err = new Error("Review Image couldn't be found");
err.status = 404;

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const image = await ReviewImage.findByPk(req.params.imageId);
    
    if (!image) {
        return next(err);
    }

    const review = await Review.findByPk(image.reviewId)


    if (req.user.id !== review.userId) {
        return next(forbid);
    }

    await image.destroy();

    res.json({
        message: "Successfully deleted"
    })
});

module.exports = router;