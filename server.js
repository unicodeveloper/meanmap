require('dotenv').load();
var  express       = require('express'),
     jwt           = require('jsonwebtoken');
     morgan        = require('morgan'),
     bodyParser    = require('body-parser'),
     mongoose      = require('mongoose'),
     User          = require('./server/models/user.server.model'),
     cor           = require('cors'),
     secrets       = require('./config/secrets'),
     testdb        = require('./config/testdb'),
     route         = require('./server/routes'),
     passport      = require('passport');


var port = process.env.PORT || 3000;

/**
 * Connect to MongoDB.
 */
testdb.dbconnect();


/**
 * Create Express server.
 */
var app = express();

/**
 * Express configuration.
 */
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true})); //use bodyParser for request and parsing info
app.use(bodyParser.json());

/**
 * Routes Configuration
 */
route(app);


/**
 * Start Express server.
 */
app.listen( port, function(){
  console.log("Mean Map Server Listening on port ", port );
});