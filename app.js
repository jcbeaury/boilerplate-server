/* environment variables */
require('dotenv').config()

/* init */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* cors TODO: configure for production */
var cors = require('cors')
app.use(cors())

/* auth */
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_SERVER,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});
app.use(jwtCheck);

/* routes */
var groupsRouter = require('./routes/groups');
app.use('/groups', groupsRouter);
var employeesRouter = require('./routes/employees');
app.use('/employees', employeesRouter);

module.exports = app;
