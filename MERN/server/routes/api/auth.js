const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

// @route  GET api/auth
// @des test route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('server error');
  }
});

// @route  Post api/auth/login
// @des user auth, login in
// @access private
router.post(
  '/',
  [
    check('email', 'email is valid').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: 'Email or password is not match' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: 'Email or password is not match' });

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: '7d',
      });
      res.status(200).json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).json('server error');
    }
  }
);

module.exports = router;
