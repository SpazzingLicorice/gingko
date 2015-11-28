var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth.js');
var db = require('./db.js');

module.exports = function (passport) {
  
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['email', 'displayName', 'name', 'gender', 'profileUrl', 'picture.type(large)', 'friends']
  },
  
  function (token, refreshToken, profile, done) {

    // Create a new User in the db from facebook profile
    db.Users.findOrCreate({
      where: { facebookId: profile.id },
      defaults: {
        facebookId: profile._json.id,
        username: profile._json.name,
        firstName: profile._json.first_name,
        lastName: profile._json.last_name,
        email: profile._json.email,
        gender: profile._json.gender,
        profilePicture: profile._json.picture.data.url,
        friends: profile._json.friends
      }
    });

    // Return the profile after Async operations are complete
    process.nextTick(function () {
      return done(null, profile);
    });

  }));

};
