var express = require('express');

var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', {
    authorized: req.user
  });
});

module.exports = router;