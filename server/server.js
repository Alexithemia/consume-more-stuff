const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const PORT = process.env.CMS_HOST_PORT;
const ENV = process.env.NODE_ENV;
const SESSION_SECRET = process.env.SESSION_SECRET

app.use(session({
  store: new redis({ url: `${process.env.REDIS_URL}:${process.env.REDIS_HOST_PORT}`, logErrors: true }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  return new User({ id: user.id }).fetch()
    .then(dbUser => {
      dbUser = dbUser.toJSON();
      return done(null, {
        id: dbUser.id,
        username: dbUser.username
      });
    })
    .catch((err) => {
      console.log(err);
      return done(err);
    });
});

passport.use(new LocalStrategy(function (username, password, done) {
  return new User({ username: username })
    .fetch()
    .then(user => {
      user = user.toJSON();
      if (user === null) {
        return done(null, false, { message: 'bad username or password' });
      }
      else {
        bcrypt.compare(password, user.password)
          .then((res) => {
            if (res) { return done(null, user); }
            else {
              return done(null, false, { message: 'bad username or password' });
            }
          });
      }
    })
    .catch(err => {
      console.log('error: ', err);
      return done(err);
    });
}));

app.get('/', (req, res) => {
  return res.send('smoke test');
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});