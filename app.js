require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./auth.js');

const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === 'production' ? 'true' : 'auto',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
module.exports = app;
