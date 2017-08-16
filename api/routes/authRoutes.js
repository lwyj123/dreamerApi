'use strict';
module.exports = function(app) {
  var auth = require('../controllers/authController');
  app.route('/signin')
    .post(auth.signin);

}