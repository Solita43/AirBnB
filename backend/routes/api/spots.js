// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');

const {requireAuth } = require('../../utils/auth.js');
const {appendToSpots } = require('../../utils/editSpotsArr');

const { User, Spot, Review, SpotImage } = require('../../db/models');



const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();





router.get('/current', requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    });

    const Spots = await appendToSpots(spots);


    res.json({Spots})
});

router.get('/', async (req, res, next) => {
    const spotsArr = await Spot.findAll();

   const Spots = await appendToSpots(spotsArr);

    res.json({
        Spots
    });
});








module.exports = router;