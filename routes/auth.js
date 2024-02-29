const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const passport = require('passport');

router.get('/google', authController.google);

router.get(
    '/google/callback',
    passport.authenticate("google", {
        session: false,
    }),
    authController.googleCallback
);

module.exports = router;