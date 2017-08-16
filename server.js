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
taskRoutes(app); //register the route
userRoutes(app);



app.listen(port);


console.log('todo list RESTful API server started on: ' + port);