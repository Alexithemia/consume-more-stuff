const express = require('express');
const router = express.Router();
const Post = require('../../database/models/Post');
const PostStatus = require('../../database/models/PostStatus');
const PostCondition = require('../../database/models/PostCondition');

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
  .get(function (req, res) {
    Post.forge().orderBy('title', 'ASC').fetchAll({
      columns: ['id', 'category_id', 'user_id', 'post_status_id', 'post_condition_id', 'title', 'content'],
      withRelated: [{
        'category': function (x) {
          x.column('id', 'name');
        },
        'user': function (x) {
          x.column('id', 'username', 'first_name', 'last_name', 'email');
        },
        'postStatus': function (x) {
          x.column('id', 'name');
        },
        'postCondition': function (x) {
          x.column('id', 'name');
        }
      }]
    })
      .then(function (postList) {
        res.json(postList);
      })
      .catch(function (err) {
        res.json(err);
      });
  })
  .post(isAuthenticated, function (req, res) {
    Post.forge({
      category_id: req.body.category_id,
      user_id: req.user.id,
      post_status_id: req.body.post_status_id,
      post_condition_id: req.body.post_condition_id,
      title: req.body.title,
      content: req.body.content
    }).save()
      .then(function () {
        res.json({ success: true });
      })
      .catch(function (err) {
        res.json({ success: false, error: err })
      })
  })

router.route('/status')
  .get(function (req, res) {
    PostStatus.fetchAll({
      columns: ['id', 'name']
    })
      .then(function (statusList) {
        res.json(statusList)
      })
      .catch(function (err) {
        res.json({ success: false, error: err })
      });
  })

router.route('/condition')
  .get(function (req, res) {
    PostCondition.fetchAll({
      columns: ['id', 'name']
    })
      .then(function (conditionList) {
        res.json(conditionList)
      })
      .catch(function (err) {
        res.json({ success: false, error: err })
      });
  })

router.route('/search/:term')
  .get(function (req, res) {
    Post.query(function (search) {
      let term = `%${req.params.term}%`;
      search.whereRaw('LOWER(title) LIKE ?', term)
        .orWhereRaw('LOWER(content) LIKE ?', term);
    }).orderBy('title', 'ASC').fetchAll({
      columns: ['id', 'category_id', 'user_id', 'post_status_id', 'post_condition_id', 'title', 'content'],
      withRelated: [{
        'category': function (x) {
          x.column('id', 'name');
        },
        'user': function (x) {
          x.column('id', 'first_name', 'last_name');
        },
        'postStatus': function (x) {
          x.column('id', 'name');
        },
        'postCondition': function (x) {
          x.column('id', 'name');
        }
      }]
    })
      .then(function (postList) {
        res.json(postList);
      })
      .catch(function (err) {
        res.json(err);
      });
  })

router.route('/:id')
  .get(function (req, res) {
    Post.where('id', req.params.id).fetch({
      columns: ['id', 'category_id', 'user_id', 'post_status_id', 'post_condition_id', 'title', 'content'],
      withRelated: [{
        'category': function (x) {
          x.column('id', 'name');
        },
        'user': function (x) {
          x.column('id', 'first_name', 'last_name');
        },
        'postStatus': function (x) {
          x.column('id', 'name');
        },
        'postCondition': function (x) {
          x.column('id', 'name');
        }
      }]
    })
      .then(function (post) {
        res.json(post)
      })
      .catch(function (err) {
        res.json({ success: false, error: err })
      });
  })
  .put(isAuthenticated, function (req, res) {
    let tempObj = {}
    if (req.body.category_id) { tempObj.category_id = req.body.category_id };
    if (req.body.user_id) { tempObj.user_id = req.body.user_id };
    if (req.body.post_status_id) { tempObj.post_status_id = req.body.post_status_id };
    if (req.body.post_condition_id) { tempObj.post_condition_id = req.body.post_condition_id };
    if (req.body.title) { tempObj.title = req.body.title };
    if (req.body.content) { tempObj.content = req.body.content };

    Post.where('id', req.params.id).save(tempObj, { patch: true })
      .then(function () {
        res.json({ success: true });
      })
      .catch(function (err) {
        res.json({ success: false, error: err });
      });
  })
  .delete(isAuthenticated, function (req, res) {
    new Post({ id: req.params.id }).destroy()
      .then(function () {
        res.json({ success: true });
      })
      .catch(function (err) {
        res.status(500).json({ success: false, error: err });
      });
  });

module.exports = router;