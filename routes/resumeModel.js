var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(require('path').resolve(__dirname,'../viewPages/index.html'));
    // res.end('ResumeModel')
});

module.exports = router;
