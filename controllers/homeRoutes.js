const router = require('express').Router();
const { Post, Comment, User } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  console.log("trying to get pOSTS$$$$$$$$$$$$$$$$$$$$")
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log("above Postss")
    console.log(posts)

    // Pass serialized data and session flag into template
    res.render('all-posts', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
            model: Comment,
            include: [User],
        },
    ],
})

    const post = postData.get({ plain: true });

    res.render('single-post', {
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  console.log(req.session.logged_in)
  if (req.session.logged_in ) {
      res.redirect('/dashboard');
      return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in ) {
      res.redirect('/');
      return;
  }
//console.log("test")
  res.render('signup');
});


module.exports = router;
