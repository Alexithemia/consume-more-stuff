const express = require('express');
const router = express.Router();
const Post = require('../../database/models/Post');
const Image = require('../../database/models/Image');
const PostStatus = require('../../database/models/PostStatus');
const PostCondition = require('../../database/models/PostCondition');
const multer = require('multer');
const upload = multer({ dest: 'server/uploads/' });
const uploadImage = require('../s3handler');

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
    Post.forge().orderBy('views', 'DESC').fetchAll({
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
        },
        'image': function (x) {
          x.column('id', 'post_id', 'url');
        },
      }]
    })
      .then(function (postList) {
        res.json(postList);
      })
      .catch(function (err) {
        res.json(err);
      });
  })
  .post(isAuthenticated, upload.array('photos', 6), function (req, res) {
    Post.forge({
      category_id: req.body.category_id,
      user_id: req.user.id,
      post_status_id: req.body.post_status_id,
      post_condition_id: req.body.post_condition_id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      dimensions: req.body.dimensions,
      notes: req.body.notes
    }).save()
      .then(function (postData) {
        let error = false;
        for (let i = 0; i < req.files.length; i++) {
          uploadImage(req.files[i], req.body.title)
            .then(function (url) {
              Image.forge({
                url: url,
                post_id: postData.attributes.id
              }).save()
                .catch(function (err) {
                  i = req.files.length;
                  error = err;
                })
            })
        }
        if (error) {
          res.json({ success: false, error: error });
        } else { res.json({ success: true }); }
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
        .orWhereRaw('LOWER(description) LIKE ?', term);
    }).orderBy('created_at', 'DESC').fetchAll({
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
        },
        'image': function (x) {
          x.column('id', 'post_id', 'url');
        },
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
      withRelated: [{
        'category': function (x) {
          x.column('id', 'name');
        },
        'user': function (x) {
          x.column('id', 'username');
        },
        'postStatus': function (x) {
          x.column('id', 'name');
        },
        'postCondition': function (x) {
          x.column('id', 'name');
        },
        'image': function (x) {
          x.column('id', 'post_id', 'url');
        },
      }]
    })
      .then(function (post) {
        post.attributes.views += 1;
        Post.where('id', req.params.id).save({ views: post.attributes.views }, { patch: true })
          .then(function () {
            res.json(post);
          })
          .catch(function (err) {
            res.json({ success: false, error: err });
          });
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
    if (req.body.description) { tempObj.description = req.body.description };
    if (req.body.image) { tempObj.image = req.body.image };
    if (req.body.price) { tempObj.price = req.body.price };
    if (req.body.manufacturer) { tempObj.manufacturer = req.body.manufacturer };
    if (req.body.model) { tempObj.model = req.body.model };
    if (req.body.dimensions) { tempObj.dimensions = req.body.dimensions };
    if (req.body.notes) { tempObj.notes = req.body.notes }

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