const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
require('dotenv').config();
const {
  getUserAccount,
  getUserId,
  insertAccount,
} = require('./dboperations');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_, __, profile, done) => {
      let user = {};
      const account = profile._json;

      try {
        const currentUserQuery = await getUserAccount(account);


        if (currentUserQuery.length === 0) {
          // insert account into users
          await insertAccount(account);

          const id = await getUserId(account);

          user = {
            id: id,
            username: account.name,
            img: account.picture,
          };
        } else {
          user = {
            id: currentUserQuery[0].id,
            username: currentUserQuery[0].username,
            img: currentUserQuery[0].img,
          };
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
