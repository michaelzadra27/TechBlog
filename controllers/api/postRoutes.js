const router = require("express").Router();
const { Post, Comment, User } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
  
  try {
    
    const newPost = await Post.create({
      ...req.body, user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const editedPost = await Post.update(req.body, {
      where: {
          id: req.params.id
      }
  })
    res.status(200).json(editedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const deletedPost = await Post.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!deletedPost) {
        res.status(404).json({ message: 'Nothing with this id!' });
        return;
      }
  
      res.status(200).json(deletedPost);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
