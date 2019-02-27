const express = require('express');
const router = express.Router();
const Message = require('../../database/models/Message');
const knex = require('../../knex/knex')

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else {
    res.status(401).json({ success: false, error: 'not authenticated' });
  };
};

// function inputValidation(req, res, next) {
//   if (!req.body.name) {
//     return res.json({ error: "Contact requires a name" })
//   }
//   if (req.body.email && req.body.email.includes('@') && req.body.email.includes('.')) { }
//   else {
//     return res.json({ error: "Contact email incorrect format" })
//   }
//   if (req.body.home && req.body.home.length < 10 || req.body.home && req.body.home.match(/[^-0-9]/gi)) {
//     return res.json({ error: "Contact home number incorrect format" })
//   }
//   if (req.body.mobile && req.body.mobile.length < 10 || req.body.mobile && req.body.mobile.match(/[^-0-9]/gi)) {
//     return res.json({ error: "Contact mobile number incorrect format" })
//   }
//   if (req.body.work && req.body.work.length < 10 || req.body.work && req.body.work.match(/[^-0-9]/gi)) {
//     return res.json({ error: "Contact work number incorrect format" })
//   }
//   next();
// }

router.route('/')
  .get(isAuthenticated, function (req, res) {
    knex.raw('SELECT from_user_id, users.username, max(messages.created_at) AS created_at FROM messages INNER JOIN users ON messages.from_user_id = users.id GROUP BY users.username, from_user_id ORDER BY created_at DESC')
      .then(function (messageUsers) {
        res.json(messageUsers.rows);
      })
      .catch(function (err) {
        res.json(err);
      });
  })
  .post(isAuthenticated, function (req, res) {
    Message.forge({
      to_user_id: req.body.to_user_id,
      from_user_id: req.user.id,
      post_id: req.body.post_id,
      body: req.body.body
    }).save()
      .then(function () {
        res.json({ success: true });
      })
      .catch(function (err) {
        res.json({ success: false, error: err })
      })
  })

router.route('/:id')
  .get(isAuthenticated, function (req, res) {
    Message.query(function (x) {
      x.where('to_user_id', req.user.id).andWhere('from_user_id', req.params.id)
    }).fetchAll()
      .then(function (messageList) {
        res.json(messageList)
      })
      .catch(function (err) {
        res.json({ success: false, error: err })
      });
  })
//   .delete(isAuthenticated, function (req, res) {
//     new Contact({ id: req.params.id }).destroy()
//       .then(function () {
//         res.json({ success: true });
//       })
//       .catch(function (err) {
//         res.status(500).json({ success: false, error: err });
//       });
//   })

module.exports = router;