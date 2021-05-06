const User = require('../models/user');

async function getAuthedUser(req, res) {
  try {
    const user = await User.findById(req.user.id).lean();
    // To-Do: user _id doesn't exist
    res.json({ message: 'your account details', payload: user });
  }
  catch(err) {
    res.status(500).json({ message: 'failed to get your details', error: err });
  }
}

module.exports = {
  getAuthedUser,
};