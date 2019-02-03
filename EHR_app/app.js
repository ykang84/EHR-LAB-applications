const express = require('express');
const bodyParser = require('body-parser');

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://ehr2:password2@ds121624.mlab.com:21624/team_random_ehr';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userRoute = require('./routes/user'); // Imports routes for the products
const patientRoute = require ('./routes/patient')
const welcomeRoute = require ('./routes/index')
// initialize our express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set ("view engine", "ejs");
app.use (express.static(__dirname+"/public"));

// setup nodejs passport for login validation
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const User = require('./models/user');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    User.findOne({"username": username}, function(err, user) {
      if (err) { return cb(err); }
      if (!user ||user === null ) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user._id);
    console.log("from passport.serializeUser: req.user: ");
  });

  passport.deserializeUser(function(id, cb) {
    console.log("from passport.deserializeUser")
    User.findOne({"_id": id}, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);

    });
  });

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
//app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRoute);
app.use('/', patientRoute)
//app.use('/', welcomeRoute)



let port = 8001;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
