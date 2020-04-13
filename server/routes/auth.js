var jwt = require('express-jwt');
var config = require('../config');

function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

var auth = {
  required: jwt({
    secret: config.JWT.JWT_SECRET_KEY,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: config.JWT.JWT_SECRET_KEY,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;
