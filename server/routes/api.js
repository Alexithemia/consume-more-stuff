const express = require('express');
const router = express.Router();
const User = require('../../database/models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const posts = require('./posts');
const messages = require('./messages');
const admin = require('./admin');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else {
    res.status(401).json({ success: false, error: 'not authenticated' });
  };
};

router.route('/users')
  .get(isAuthenticated, function (req, res) {
    User.where('id', req.user.id).fetch({
      columns: ['username', 'first_name', 'last_name', 'verified']
    })
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        res.json(err);
      });
  })
  .put(isAuthenticated, function (req, res) {
    User.where('id', req.user.id).save({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }, { patch: true })
      .then(function () {
        res.json({ success: true });
      })
      .catch(function (err) {
        res.json(err);
      });
  });

router.post('/register', (req, res) => {
  const saltRounds = 12;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return res.status(500).json({ success: false, error: err })
    }
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        return res.status(500).json({ success: false, error: err })
      }
      return new User({
        username: req.body.username,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
      })
        .save()
        .then((user) => {
          res.json({ success: true });
        })
        .catch((err) => {
          return res.status(500).json({ success: false, error: err });
        });
    });
  });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.json({ success: true });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ success: true });
});

router.use('/posts', posts);

router.use('/messages', messages);

// router.use('/admin', admin);

module.exports = router;