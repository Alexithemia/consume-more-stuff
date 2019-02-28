const express = require('express');
const router = express.Router();
const User = require('../../database/models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const posts = require('./posts');
const messages = require('./messages');
const category = require('./category');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else {
    res.status(401).json({ success: false, error: 'not authenticated' });
  };
};

function isAdmin(req, res, next) {
  if (req.user.is_admin) { next(); }
  else {
    res.status(401).json({ success: false, error: 'Unauthorized' });
  };
};

router.route('/users')
  .get(isAuthenticated, function (req, res) {
    User.where('id', req.user.id).fetch({
      columns: ['username', 'first_name', 'last_name', 'email', 'verified']
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

router.route('/blockuser/')
  .put(isAdmin, function (req, res) {
    User.where('id', req.body.id).save({
      status_id: 1
    }, { patch: true })
      .then(function () {
        res.json({ success: true });
      })
      .catch(function (err) {
        res.json({ success: false, error: err });
      });
  })

router.route('/unblockuser/')
  .put(isAdmin, function (req, res) {
    User.where('id', req.body.id).save({
      status_id: 2
    }, { patch: true })
      .then(function () {
        res.json({ success: true });
      })
      .catch(function (err) {
        res.json({ success: false, error: err });
      });
  })

router.route('/users/all')
  .get(isAdmin, function (req, res) {
    User.forge().orderBy('username', 'ASC').fetchAll({
      columns: ['username', 'first_name', 'last_name', 'email', 'verified', 'status_id', 'is_admin']
    })
      .then(function (userList) {
        res.json({ users: userList });
      })
      .catch(function (err) {
        res.json({ success: false, error: err });
      });
  })

router.route('/users/password')
  .put(isAuthenticated, function (req, res) {
    return new User({ id: req.user.id })
      .fetch()
      .then(user => {
        if (user === null) {
          return done(null, false, { message: 'bad username or password' });
        }
        else {
          user = user.toJSON();
          bcrypt.compare(req.body.password, user.password)
            .then((result) => {
              if (result) {
                const saltRounds = 12;
                bcrypt.genSalt(saltRounds, (err, salt) => {
                  if (err) {
                    return res.status(500).json({ success: false, error: err })
                  }
                  bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
                    if (err) {
                      return res.status(500).json({ success: false, error: err })
                    }
                    User.where('id', req.user.id).save({
                      password: hash,
                      first_name: 'edit'
                    }, { patch: true })
                      .then(function () {
                        res.json({ success: true });
                      })
                      .catch(function (err) {
                        res.json(err);
                      });
                  });
                })
              } else {
                res.json({ message: 'bad username or password' });
              }
            });
        }
      })
      .catch(err => {
        console.log('error: ', err);
        return done(err);
      });
  })

router.use('/posts', posts);

router.use('/messages', messages);

router.use('/category', category);

module.exports = router;