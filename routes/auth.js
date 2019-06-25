var passport = require('passport');
var express = require('express');
var router = express.Router();


// router для выхода из сайта
router.post('/logout', function (req, res, next) {
    req.logout();
    res.sendStatus(200);
});

//Авторизация в вк
router.get('/auth/vk', passport.authenticate('vk', {
    scope: ['friends']
}),
    function (req, res) {
});

//callback вк
router.get('/auth/vk/callback', passport.authenticate('vk', {
    failureRedirect: '/'
}),
function (req, res) {
    res.redirect('/');
});

module.exports = router;