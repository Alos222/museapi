const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');
const User = require('../models/User');

/* ==== Routes ==== */

/* Register */
router.post('/register', async (req, res) => {
  try {

    let { username, email, password, passwordCheck } = req.body;

    if (!email || !password || !passwordCheck) {
      return res.status(400).json(
        { 
          message: 'Missing fields; all fields are required' 
        }
      );
    }

    if (password.length < 8) {
      return res.status(400).json(
        {
          message: 'Password must be at least 8 characters',
        }
      );
    }

    if (password !== passwordCheck) {
      return res.status(400).json(
        { 
          message: 'Passwords do not match', 
        }
      );
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json(
        { 
          message: 'Email is already associated with an account',
        }
      );
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({

      username,
      email, 
      password: passwordHash,

    });

    const savedUser = await newUser.save();

    res.json(savedUser);

  } catch (err) {
    res.status(500).json(
      {
        error: err.message, 
      }
    );
  }
});

/* Login */
router.post('/login', async (req, res) => {
  try {
    
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json(
        {
          message: 'All fields are required',
        }
      );
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json(
        {
          message: 'Account does not exist; please register',
        }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json(
        {
          message: 'Invalid login credentials'
        }
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json(
      {
        token,
        user: {
          id: user._id
        },
        username: user.username,
      },
    );

  } catch (err) {
    res.status(500).json(
      {
        error: err.message,
      }
    );
  }
});

/* Verify JWT Validity */
router.post('/tokenIsValid', async (req, res) => {
  try {

    const token = req.header('x-auth-token');
  
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);

    if (!user) {
      return res.json(false);
    }

    return res.json(true);

  } catch (err) {
    res.status(500).json(
      {
        error: err.message,
      }
    );
  }
});

/* Get User */
router.get('/', auth, async (req, res) => {

  const user = await User.findById(req.user);

  res.json(
    {
      username: user.username,
      id: user._id,
    }
  );
});

/* Delete User */
router.delete('/delete', auth, async (req, res) => {
  try {
    
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);

  } catch (err) {

    res.status(500).json(
      {
        error: err.message,
      }
    );
  }
});

module.exports = router;