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

/* auth */
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://hello-jcb.auth0.com/.well-known/jwks.json"
  }),
  audience: 'boilerplate-server',
  issuer: "https://hello-jcb.auth0.com/",
  algorithms: ['RS256']
});
app.use(jwtCheck);

/* routes */
var groupsRouter = require('./routes/groups');
app.use('/groups', groupsRouter);
var employeesRouter = require('./routes/employees');
app.use('/employees', employeesRouter);

module.exports = app;
