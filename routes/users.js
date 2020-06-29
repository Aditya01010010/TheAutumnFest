var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('passportapp',['users']);
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


router.get('/login',function (req,res) {

    res.render('login.ejs');

});

router.get('/register',function (req,res) {

    res.render('register.ejs');

});

router.get('/error',function (req,res) {

    res.render('error.ejs');

});

router.get('/dropi',function (req,res) {

    res.render('dropi.ejs');

});
router.get('/dropii',function (req,res) {

    res.render('dropii.ejs');

});
router.get('/dropiii',function (req,res) {

    res.render('dropiii.ejs');

});
router.get('/dropiv',function (req,res) {

    res.render('dropiv.ejs');

});

router.get('/dropv',function (req,res) {

    res.render('dropv.ejs');

});
router.get('/dropvi',function (req,res) {

    res.render('dropvi.ejs');

});
router.get('/dropvii',function (req,res) {

    res.render('dropvii.ejs');

});
router.get('/dropviii',function (req,res) {

    res.render('dropviii.ejs');

});

router.post('/register',function (req,res) {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    req.checkBody('name','Name Field is Required').notEmpty();
    req.checkBody('email','Email Field is Required').notEmpty();
    req.checkBody('password','Password Field is Required').notEmpty();
    req.checkBody('email','Please Enter a Valid Email Address').isEmail();
    req.checkBody('password2','Passwords Do Not Match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors) {

        console.log("Errors Detected");

        res.render('register', {
            errors : errors,
            name : name,
            email : email,
            password : password,
            password2 : password2
        });
    } else {

        newUser = {

            name : name,
            email : email,
            password : password,
            events : [],
            workshops : []
        };

        bcrypt.genSalt(10,function(err,salt) {

            bcrypt.hash(newUser.password,salt,function(err,hash) {

                newUser.password = hash;

                db.users.insert(newUser,function(err,doc) {

                    if(err) {
                        res.send(err);
                    } else {
        
                        
                        res.location('/users/login');
                        res.redirect('/users/login');
                    }
        
                });

            });

        });        
        
    }
} );


passport.serializeUser(function(user, done) {

    done(null, user._id);

});
  
passport.deserializeUser(function(id, done) {

    db.users.findOne({_id : mongojs.ObjectId(id)},function(err,user){

        done(err,user);

    });

});

passport.use( new LocalStrategy( {usernameField : 'email'},

    function(email,password,done) {
        db.users.findOne({ email : email },function(err,user) {

            if(err) {
                console.log("error");
                return done(err);
            }
            if(!user) {
                console.log("email");
                return done(null,false,{message : 'Incorrect Email ID'});                
            }

            bcrypt.compare(password,user.password,function(err,isMatch){

                
                if(err) {
                    return done(err);
                }
                if(isMatch) {
                    return done(null,user);
                } else {
                    console.log("password");
                    return done(null,false,{message : 'Incorrect Password'});                    
                }

            });

        });
    }
));

router.post('/login', 
    passport.authenticate('local', { 
    successRedirect: '/index',
    failureFlash: 'Invalid Credentials' 
    }),
    function (req,res) {
        console.log("Authorisation Successful");
        res.redirect('/index');
});

router.get('/logout',function(req,res) {

    req.logout();
    
    res.redirect('/');

});

router.post('/DJN',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$push : {"events" : "DJ Night"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {

            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

router.post('/DRW',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$push : {"events" : "Drama Week"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {

            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

router.post('/FUT',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$push : {"events" : "Futsal"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {
            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

router.post('/LTG',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$push : {"events" : "Laser Tag"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {
            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

router.post('/APP',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$push : {"workshops" : "App Development Workshop"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {
            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

router.post('/ART',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$push : {"workshops" : "Art Workshop"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {
            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

router.post('/ACT',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$push : {"workshops" : "Acting Workshop"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {
            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

router.post('/WEB',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$push : {"workshops" : "Web Development Workshop"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {

            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

router.post('/deli',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$pull : {"events" : "DJ Night"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {

            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

router.post('/delii',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$pull : {"events" : "Drama Week"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {

            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

router.post('/deliii',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$pull : {"events" : "Futsal"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {

            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

router.post('/deliv',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$pull : {"events" : "Laser Tag"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {

            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

router.post('/delv',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$pull : {"workshops" : "Art Workshop"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {

            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});
router.post('/delvi',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$pull : {"workshops" : "Acting Workshop"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {

            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});
router.post('/delvii',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$pull : {"workshops" : "App Development Workshop"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {

            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});
router.post('/delviii',function (req,res) {

    var email = req.body.email;


    db.users.update({ email : email },{$pull : {"workshops" : "Web Development Workshop"}},function(err,doc) {

        if(err) {
            res.send(err);
        } else {

            
            res.location('/index');
            res.redirect('/index');
        }

    }); 

});

module.exports = router;


 

    