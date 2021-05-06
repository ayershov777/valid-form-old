const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

async function signup(req, res) {
  try {
    const reqUser = req.body.userDetails;
    const hash = await bcrypt.hash(reqUser.password, 6);
    const user = await User.create({...reqUser, password: hash});
    const token = jwt.getToken(user);
    res.json({ message: 'signup successful', payload: token });
  }
  catch(err) {
    res.json({ message: 'signup failed', error: err.message });
  }
} 

async function login(req, res) {
  try {
    const reqUser = req.body.userDetails;
    const user = await User.findOne({ username: reqUser.username }).lean();
    //username doesn't exist
    const match = await bcrypt.compare(reqUser.password, user.password);

    if(match) {
      const token = jwt.getToken(user);
      res.json({ message: 'login successful', payload: token });
    }
    else {
      res.status(400).json({ message: 'login failed' });
    }
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ message: 'login failed', error: err.message });
  }
}

module.exports = {
  login,
  signup,
};