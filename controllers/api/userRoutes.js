const router = require("express").Router();
const { User } = require("../../models");

router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email
      req.session.logged_in = true;

      res.status(200).json(userData);
      console.log(userData)
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", (req, res) => {
  console.log("in User ROUTE")
  console.log(req.body.email)
  User.findOne({
      where: {
          email: req.body.email
      }
  }).then(dbUserData => {
      if (!dbUserData) {
          res.status(400).json({ message: 'No user account found!' });
          return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);
      console.log(validPassword)

      if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
      }

      req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.email = dbUserData.email;
          req.session.logged_in = true;

          res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
  });
});



router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete("/user/:id", (req, res) => {
  try {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
  }
  res.json(userData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
