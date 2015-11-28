var express = require('express');
var _ = require('lodash');
var request = require('request');
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var qs = require('querystring');
var auth = require('../services/auth.js');

// Config for Yelp oAuth Request
// set_parameters: object with params to search
// callback: callback(error, response, body)
var request_yelp = function(set_parameters, callback) {
  var httpMethod = 'GET';
  var url = 'http://api.yelp.com/v2/search';

  var default_parameters = {
    location: 'San+Francisco',
    sort: '0'
  };

  var required_parameters = {
    oauth_consumer_key: auth.oauth.consumer_key,
    oauth_token: auth.oauth.token,
    oauth_nonce: n(),
    oauth_timestamp: n().toString().substr(0, 10),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0'
  };

  // Parameters combined in order of importance
  var parameters = _.assign(default_parameters, set_parameters, required_parameters);

  var consumerSecret = auth.yelp.consumerSecret;
  var tokenSecret = auth.yelp.tokenSecret;

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, {
    encodeSignature: false
  });

  parameters.oauth_signature = signature;
  var paramURL = qs.stringify(parameters);
  var apiURL = url + '?' + paramURL;

  request(apiURL, function(error, response, body) {
    return callback(error, response, body);
  });

};

module.exports = function(passport, isLoggedIn) {

  var router = express.Router();

  router.get('/', function(req, res) {

    // Set Yelp Search API params
    var params = {
      term: req.query.term,
      limit: "10"
    };

    // GET query results from Yelp
    request_yelp(params, function(err, response, body) {
      if (err) {
        console.error("Error hitting Yelp's Search API: ", err);
      } else {
        res.send(JSON.parse(body).businesses);
      }
    });
  });

  return router;
};
