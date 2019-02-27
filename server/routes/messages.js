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
    knex.raw('SELECT from_user_id, max(created_at) AS created_at FROM messages GROUP BY from_user_id ORDER BY created_at DESC')
      .then(function (messageList) {
        res.json(messageList);
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

// router.route('/search/:term')
//   .get(isAuthenticated, function (req, res) {
//     Contact.query(function (search) {
//       search.where('created_by', req.user.id)
//         .andWhere(function () {
//           let term = `%${req.params.term}%`
//           this.whereRaw('LOWER(name) LIKE ?', term)
//             .orWhereRaw('LOWER(address) LIKE ?', term)
//             .orWhereRaw('LOWER(mobile) LIKE ?', term)
//             .orWhereRaw('LOWER(work) LIKE ?', term)
//             .orWhereRaw('LOWER(home) LIKE ?', term)
//             .orWhereRaw('LOWER(email) LIKE ?', term)
//             .orWhereRaw('LOWER(twitter) LIKE ?', term)
//             .orWhereRaw('LOWER(instagram) LIKE ?', term)
//             .orWhereRaw('LOWER(github) LIKE ?', term)
//         })
//     }).orderBy('name', 'ASC').fetchAll({
//       columns: ['id', 'name', 'address', 'mobile', 'work', 'home', 'email', 'twitter', 'instagram', 'github']
//     })
//       .then(function (contactList) {
//         res.json(contactList);
//       })
//       .catch(function (err) {
//         res.json(err);
//       });
//   });

// router.route('/:id')
//   .get(isAuthenticated, function (req, res) {
//     Contact.where('id', req.params.id).fetch({
//       columns: ['id', 'name', 'address', 'mobile', 'work', 'home', 'email', 'twitter', 'instagram', 'github']
//     })
//       .then(function (contact) {
//         res.json(contact)
//       })
//       .catch(function (err) {
//         res.json({ success: false, error: err })
//       });
//   })
//   .put(isAuthenticated, function (req, res) {
//     let tempObj = {}
//     if (req.body.name) { tempObj.name = req.body.name };
//     if (req.body.address) { tempObj.address = req.body.address };
//     if (req.body.mobile) { tempObj.mobile = req.body.mobile };
//     if (req.body.work) { tempObj.work = req.body.work };
//     if (req.body.home) { tempObj.home = req.body.home };
//     if (req.body.email) { tempObj.email = req.body.email };
//     if (req.body.twitter) { tempObj.twitter = req.body.twitter };
//     if (req.body.instagram) { tempObj.instagram = req.body.instagram };
//     if (req.body.github) { tempObj.github = req.body.github };

//     Contact.where('id', req.params.id).save(tempObj, { patch: true })
//       .then(function () {
//         res.json({ success: true });
//       })
//       .catch(function (err) {
//         res.json({ success: false, error: err });
//       });
//   })
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