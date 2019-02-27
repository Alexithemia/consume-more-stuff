const express = require('express');
const router = express.Router();
const items = require('./items');
const comments = require('./comments');
const admin = require('./admin');
const User = require('../database/models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const saltRounds = 12;

router.route('/users')
  .get(function (req, res) {
    User.where('id', req.user.id).fetch({
      columns: ['email', 'first_name', 'last_name', 'verified']
    })
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        res.json(err);
      });
  })
  .put(function (req, res) {
    User.where('id', req.user.id).save({
      email: req.body.email,
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
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return res.status(500).json({ success: false, error: err })
    }
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        return res.status(500).json({ success: false, error: err })
      }
      return new User({
        email: req.body.email,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
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

router.use('/items', items);

router.use('/comments', comments);

router.use('/admin', admin);

module.exports = router;