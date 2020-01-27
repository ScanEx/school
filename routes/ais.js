var express = require('express');
var router = express.Router();
const AIS = require('../models/ais.js');

router.get('/:limit/:offset', function(req, res, next) {
    AIS.findAndCountAll({
        limit: req.params.limit,
        offset: req.params.offset
    })
    .then(function(items) {
        res.send(items);    
    })
    .catch(function(e) {
        console.log(e);
    });    
});

module.exports = router;