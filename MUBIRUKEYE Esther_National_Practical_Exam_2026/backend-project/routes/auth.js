const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let users = [
  {
    username: 'admin',
    password: bcrypt.hashSync('1234', 10),
    role: 'admin',
  },
];

router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth routes working',
  });
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const exists = users.find(
      (u) => u.username === username
    );

    if (exists) {
      return res.status(400).json({
        message: 'Username already exists',
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    users.push({
      username,
      password: hashed,
      role: 'staff',
    });

    res.status(201).json({
      message: 'Registration successful',
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(
      (u) => u.username === username
    );

    if (!user) {
      return res.status(400).json({
        message: 'Invalid username',
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }

    const token = jwt.sign(
      {
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || 'secretkey',
      {
        expiresIn: '1d',
      }
    );

    res.json({
      token,
      username: user.username,
      role: user.role,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;