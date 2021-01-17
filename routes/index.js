var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.sendFile( path.join(__dirname, '../public', 'admin.html'));
});

module.exports = router;
