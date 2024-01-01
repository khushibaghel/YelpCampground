const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user')
const users = require('../controllers/users');
const {storeReturnTo} = require('../middleware');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.get('/login', users.renderLogin);

//using passport.authenticate middleware with local strategy(could use google, facebook, etc to authenticate)
router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login )

router.get('/logout', users.logout);

module.exports = router;