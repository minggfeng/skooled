var PASSPORT_JWT_SECRETORKEY = process.env.PASSPORT_JWT_SECRETORKEY || require('./config/config.js').PASSPORT_JWT_SECRETORKEY;
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');

var ExtractJwt = passportJWT.ExtractJwt;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = PASSPORT_JWT_SECRETORKEY;


module.exports = {
  ensureAuth : (req, res, next) => {
    var token = req.headers['authorization'];
    jwt.verify(token, jwtOptions.secretOrKey, function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  },

  createToken : (payload) => {
    return jwt.sign(payload, jwtOptions.secretOrKey);
  },

};
