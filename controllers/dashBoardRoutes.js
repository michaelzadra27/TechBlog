const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        })
        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('myposts', {
            layout: 'dashboard',
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render('newPost', {
        layout: 'dashboard'
    });
});

router.get("/edit/:id", withAuth, async (req, res) => {
    try {

        const postData = await Post.findByPk(req.params.id)


        const post = postData.map((post) => post.get({ plain: true }));

        res.render("edit", {
            layout: "dashboard",
            post
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;