const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
const {googleId, googleSecret, googleCallback} = require('../../secrets')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 */

// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   console.log('Google client ID / secret not found. Skipping Google OAuth.')
// } else {
//for dev testing

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID || googleId,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || googleSecret,
  callbackURL: process.env.GOOGLE_CALLBACK || googleCallback
}

const strategy = new GoogleStrategy(
  googleConfig,
  (token, refreshToken, profile, done) => {
    const googleId = profile.id
    const email = profile.emails[0].value
    const firstName = profile.name.givenName
    const lastName = profile.name.familyName

    User.findOrCreate({
      where: {googleId},
      defaults: {email, firstName, lastName}
    })
      .then(([user]) => done(null, user))
      .catch(done)
  }
)

passport.use(strategy)

router.get('/', passport.authenticate('google', {scope: ['email', 'profile']}))

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/login'
  })
)
//}
