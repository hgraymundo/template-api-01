'use strict'

const
  express     =   require('express'),
  app         =   express(),
  bodyParser  = require('body-parser'),
  morgan      = require('morgan'),
  cors        = require('cors'),
  validation    = require('express-validator'),
  env         = require('./configuration/config'),
  passport   = require('passport'),
  session    = require('express-session'), //basic configuration for variables
  cookieParser = require('cookie-parser'),
  Sequelize = require('sequelize');

// CONFIGURATIONS
//CORS Cross-origin resource sharing
// allows restricted resources on a web page to be requested from another domain
app.use(cors({ origin: [
  "http://localhost:4200"
], credentials: true})); // Enable for angular client
// app.use(cors());
// setup bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//HTTP request logger middleware for node.js
app.use(morgan('dev'));
//add validation support
app.use(validation());
// setup view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// SETUP static files
app.use(express.static(__dirname + '/public'));
//route base
app.get("/", (req, res) => {
  res.json({ msg: "API BUSCAMECOMO"});
});
// setup Sequelize
var models = require("./models");
//Sync Database
models.sequelize.sync({force: true }).then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});
// setup storage session
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var sequelize = new Sequelize(
"session",
"root",
"root", {
    "dialect": "mysql"
});

var myStore = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 6 * 10000,
    expiration: 30*10000
})
//
app.use(cookieParser())
// setup session
app.use(session({
  name: 'site-cookie',
  secret: 'keyboard cat',
  store: myStore,
  resave: false,
  saveUninitialized: false
  // saveUninitialized: false,
  // cookie: {
  //   maxAge: 30*10000
  // }
}))

myStore.sync();

require('./configuration/passport')(passport); // pass passport for configuration
app.use(passport.initialize());
app.use(passport.session());
//add more routes

// var login   = require('./route/login.js')(app);
// var user  = require('./routes/user.js')(app);
// require('./routes/account.js')(app);

require('./route/account.js')(app);
require('./route/category.js')(app);
require('./route/company.js')(app);
require('./route/medico.js')(app);


//run server
app.listen(env.PORT, ()=> {
  console.log("Server is running on "+ env.PORT +" port");
});
