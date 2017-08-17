'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('Users');
var jwt = require('jsonwebtoken');
var config = require('../../config')
exports.signin = function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    console.log(user)
    if (err) throw err;

    if (!user) {
      res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.status(422).json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, config.secret, {
          expiresIn : 60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
}

exports.verify = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['Access-Token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
}
