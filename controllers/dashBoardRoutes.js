const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    
    try {
        console.log("In the TRY")
        console.log(req.session.user_id)
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        })
        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log("Data serialized")
        console.log(posts)

        // Pass serialized data and session flag into template
        res.render('all-posts-admin', {
            layout: 'dashboard', posts
            
        });
        
    } catch (err) {
        res.status(500).json(err);
        console.log("Can't Get Post Data")
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render('newPost', {
        layout: 'dashboard'
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id)
        .then(postData => {
            if (postData) {
                const post = postData.get({ plain: true });

                res.render("edit", {
                    layout: "dashboard",
                    post
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


module.exports = router;