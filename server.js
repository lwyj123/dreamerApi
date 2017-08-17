var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Dreamerdb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/*app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
}) */
var taskRoutes = require('./api/routes/todoListRoutes'); //importing route
var userRoutes = require('./api/routes/userRoutes'); //importing route
var authRoutes = require('./api/routes/authRoutes');

authRoutes(app);
userRoutes(app);
// token verify
var jwt = require('jsonwebtoken');
var config = require('./config')
var apiRoutes = express.Router();
apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['access-token'];
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded._doc;  
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(401).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
}); 
app.use('/', apiRoutes);

taskRoutes(app); //register the route




app.listen(port);


console.log('todo list RESTful API server started on: ' + port);