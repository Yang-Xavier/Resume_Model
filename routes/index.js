var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(require('path').resolve(__dirname,'../resumes/杨炳勋.html'));
});

module.exports = router;
