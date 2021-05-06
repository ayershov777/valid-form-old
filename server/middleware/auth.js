const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  }
  catch(err) {
    res.status(400).json({ message: 'request failed', error: err.message });
  }
}

function optionalAuth(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  }
  catch(err) {
    req.user = undefined;
    next();
  }
}

module.exports = {
  requireAuth,
  optionalAuth,
};