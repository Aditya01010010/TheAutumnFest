var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/',function (req,res) {

    res.render('home.ejs');

});

router.get('/index',ensureAuthenticated,function (req,res) {

    res.render('index.ejs');

});

router.get('/events',function (req,res) {

    res.render('events.ejs');

});

router.get('/workshops',function (req,res) {

    res.render('workshops.ejs');

});


function ensureAuthenticated(req,res,next) {

    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
    
};


module.exports = router;

